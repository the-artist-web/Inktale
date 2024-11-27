'use strict';

const User = require("../models/user_model");
const Blog = require("../models/blog_model");
const getPagination = require("../utils/get_pagination_util");

const renderProfile = async (req, res) => {
    try {
        const { username } = req.params;

        const userExists = await User.exists({ username });

        if (!userExists) { return res.render("./page/404"); };

        const profile = await User.findOne({ username })
        .select("profilePhoto username name bio blogs blogPublished createdAt");

        const pagination = getPagination(`/profile/${username}`, req.params, 20, profile.blogs.length);

        const profileBlogs = await Blog.find({ _id: { $in: profile.blogs } })
        .select("title createdAt reaction totalBookmark readingTime")
        .populate({
            path: "owner",
            select: "name username profilePhoto"
        })
        .sort({ createdAt: "desc" })
        .limit(pagination.limit)
        .skip(pagination.skip);

        res.render("./pages/profile", {
            sessionUser: req.session.user,
            profile,
            profileBlogs,
            pagination
        });
    } catch (error) {
        console.error("Error Rendering Profile: ", error.messgae);
        throw error;
    };
};

module.exports = renderProfile;