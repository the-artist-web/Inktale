'use strict';

/**
 * node modules
 */
const crypto = require("crypto");

/**
 * custom modules
 */
const uploadToCloudinary = require("../config/cloudinary_config");
const Blog = require("../models/blog_model");
const User = require("../models/user_model");
const getReadingTime = require("../utils/get_reading_time_utils");

const renderCreateBlog = (req, res) => {
    res.render("./pages/create_blog", {
        sessionUser: req.session.user,
        route: req.originalUrl
    });
};

const postCreateBlog = async (req, res) => {
    try {
        const { banner, title, content } = req.body;

        const public_id = crypto.randomBytes(10).toString("hex");

        const bannerURL = await uploadToCloudinary(banner, public_id);

        const user = await User.findOne({ username: req.session.user.username })
        .select("_id blogs blogPublished");

        const newBlog = await Blog.create({
            banner: {
                url: bannerURL,
                public_id
            },
            title,
            content,
            owner: user._id,
            readingTime: getReadingTime(content)
        });

        user.blogs.push(newBlog._id);
        user.blogPublished++;
        await user.save();

        res.redirect(`blogs/${newBlog._id}`);
    } catch (error) {
        console.error("Error Create New Blog", error.message);
        throw error;
    };
};

module.exports = {
    renderCreateBlog,
    postCreateBlog
};