'use strict';

/**
 * custom module
 */
const User = require("../models/user_model");
const Blog = require("../models/blog_model");
const getPagination = require("../utils/get_pagination_util");

const addToReadingList = async (req, res) => {
    try {
        if (!req.session.user) return res.sendStatus(401);

        const { username } = req.session.user;

        const { blogId } = req.params;

        const loggedUser = await User.findOne({ username })
        .select("readingList");

        if (loggedUser.readingList.includes(blogId)) { return res.sendStatus(400) };

        loggedUser.readingList.push(blogId);
        await loggedUser.save();

        const readingListedBlog = await Blog.findById(blogId)
        .select("totalBookmark");

        readingListedBlog.totalBookmark++;
        await readingListedBlog.save();

        res.sendStatus(200);
    } catch (error) {
        console.error("Error Updating Reading List: ", error.message);
        throw error;
    };
};

const removeFromReadingList = async (req, res) => {
    try {
        if (!req.session.user) return res.sendStatus(401);

        const { username } = req.session.user;

        const { blogId } = req.params;

        const loggedUser = await User.findOne({ username })
        .select("readingList");

        if (!loggedUser.readingList.includes(blogId)) { return res.sendStatus(400) };

        loggedUser.readingList.splice(loggedUser.readingList.indexOf(blogId), 1);
        await loggedUser.save();

        const readingListedBlog = await Blog.findById(blogId)
        .select("totalBookmark");

        readingListedBlog.totalBookmark--;
        await readingListedBlog.save();

        res.sendStatus(200);
    } catch (error) {
        console.error("Error Delete From Reading List: ", error.message);
        throw error;
    };
};

const renderReadingList = async (req, res) => {
    try {
        const { username } = req.session.user;

        const { readingList } = await User.findOne({ username })
        .select("readingList");

        const pagination = getPagination("/redinglist", req.params, 20, readingList.length);

        const readingListBlogs = await Blog.find({ _id: { $in: readingList } })
        .select("owner createdAt readingTime title reaction totalBookmark")
        .populate({
            path: "owner",
            select: "name username profilePhoto"
        })
        .limit(pagination.limit)
        .skip(pagination.skip);

        res.render("./pages/reading_list", {
            sessionUser: req.session.user,
            readingListBlogs,
            pagination
        });
    } catch (error) {
        console.error("Error Rendering Reading List: ", error.message);
        throw error;
    };
};

module.exports = {
    addToReadingList,
    removeFromReadingList,
    renderReadingList
};