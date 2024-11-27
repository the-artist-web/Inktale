'use strict';

const User = require("../models/user_model");

const renderDashboard = async (req, res) => {
    try {
        const { username } = req.session.user;

        const loggedUser = await User.findOne({ username })
        .select("totalVisits totalReactions blogPublished blogs")
        .populate({
            path: "blogs",
            select: "title createdAt updatedAt reaction totalVisit",
            options: { sort: { createdAt: "desc" } }
        });

        res.render("./pages/dashboard", {
            sessionUser: req.session.user,
            loggedUser
        });
    } catch (error) {
        console.error("Error Rendering Dashboard", error.message);
        throw error; 
    };
};

module.exports = renderDashboard;