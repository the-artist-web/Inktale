'use strict';

/**
 * node modules
 */
const mongoose = require("mongoose");

/**
 * custom modules
 */
const Blog = require("../models/blog_model");
const User = require("../models/user_model");
const markdown = require("../config/markdown_it_config");

const renderBlogDetail = async (req, res) => {
    try {
        const { blogId } = req.params;

        const isValidObjectId = mongoose.Types.ObjectId.isValid(blogId);

        if (!isValidObjectId) {
            return res.render("./pages/404");
        };

        const blogExists = await Blog.exists({ _id: new mongoose.Types.ObjectId(blogId) });

        if (!blogExists) {
            return res.render("./pages/404");
        };

        const blog = await Blog.findById(blogId)
        .populate({
            path: "owner",
            select: "name username profilePhoto"
        });

        const ownerBlogs = await Blog.find({ owner: { _id: blog.owner._id } })
        .select("title reaction totalBookmark owner reading Time createdAt")
        .populate({
            path: "owner",
            select: "name username profilePhoto"
        })
        .where("_id").nin(blogId)
        .sort({ createdAt: "desc" })
        .limit(3);

        let user;
        if (req.session.user) {
            user = await User.findOne({ username: req.session.user.username })
            .select("reactedBlogs readingList");
        };

        res.render("./pages/blog_detail", {
            sessionUser: req.session.user,
            blog,
            ownerBlogs,
            user,
            markdown
        });
    } catch (error) {
        console.error("Error Rendering Blog Detail Pgae: ", error.message);
        throw error;
    };
};

module.exports = renderBlogDetail;