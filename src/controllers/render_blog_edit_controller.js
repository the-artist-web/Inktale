'use strict';

const Blog = require("../models/blog_model");
const uploadToCloudinary = require("../config/cloudinary_config");

const renderBlogEdit = async (req, res) => {
    try {
        const { blogId } = req.params;

        const { username } = req.session.user;

        const currentBlog = await Blog.findById(blogId)
        .select("banner title content owner")
        .populate({
            path: "owner",
            select: "username"
        });

        if (currentBlog.owner.username !== username) {
            return res.status(403).send("<h2>Sorry, you don\'t have permission to edit this article as you\'re not the author.</ h2>");
        };

        res.render("./pages/blog_update", {
            sessionUser: req.session.user,
            currentBlog
        });
    } catch (error) {
        console.error("Error Rendering Blog Edit Page: ", error.message);
        throw error;
    };
};

const updateBlog = async (req, res) => {
    try {
        const { blogId } = req.params;

        const { title, content, banner } = req.body;

        const updatedBlog = await Blog.findById(blogId)
        .select("banner title content");

        if (banner) {
            const bannerURL = await uploadToCloudinary(banner, updatedBlog.public_id);
            updatedBlog.banner.url = bannerURL;
        };

        updatedBlog.title = title;
        updatedBlog.content = content;

        await updatedBlog.save();

        res.sendStatus(200);
    } catch (error) {
        console.error("Error Updation Blog: ", error.message);
        throw error;
    };
};

module.exports = { 
    renderBlogEdit,
    updateBlog
};