'use strict';

/**
 * custom modules
 */
const Blog = require("../models/blog_model");
const gapPagination = require("../utils/get_pagination_util");

const renderHome = async (req, res) => {
    try {
        const totalBlogs = await Blog.countDocuments();

        const pagination = gapPagination('/', req.params, 20, totalBlogs);

        const latestBlogs = await Blog.find()
        .select('banner author createdAt reading Time readingTime title reaction totalBookmark')
        .populate({
            path: 'owner',
            select: 'name username profilePhoto'
        })
        .sort({ createAt: 'desc' })
        .limit(pagination.limit)
        .skip(pagination.skip);
 
        res.render("./pages/home", {
            sessionUser: req.session.user,
            latestBlogs,
            pagination
        });
    } catch (error) {
        console.error("Error rendering home page: ", error.message);
        throw error;
    };
};

module.exports = renderHome;