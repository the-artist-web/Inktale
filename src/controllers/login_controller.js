'use strict';

/**
 * node modules
 */
const bcrypt = require("bcrypt");

const User = require("../models/user_model");

const renderLogin = (req, res) => {
    const { userAuthenticated } = req.session.user || {};

    if (userAuthenticated) { return res.redirect("/"); };

    res.render("./pages/login");
};

const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const currentUser = await User.findOne({ email });

        if (!currentUser) { return res.status(400).json({ message: "No user found with this email address" }); };

        const passwordIsValid = await bcrypt.compare(password, currentUser.password);

        if (!passwordIsValid) { return res.status(400).json({ message: 'Invalid password. Please ensure you\'ve entered the correct password and try again' }); };

        req.session.user = {
            userAuthenticated: true,
            name: currentUser.name,
            username: currentUser.username,
            profilePhoto: currentUser.profilePhoto?.url
        };

        return res.redirect("/");
    } catch (error) {
        console.log("postLogin: ", error.message);
        throw error;
    };
};

module.exports = {
    renderLogin,
    postLogin
};