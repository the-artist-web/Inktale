'use strict';

/**
 * node modules
 */
const bcrypt = require("bcrypt");

/**
 * custom modules
 */
const User = require("../models/user_model");
const generateUsername = require("../utils/generate_username_util");

/**
 * register process is completed
 */
const renderRegister = (req, res) => {
    const { userAuthenticated } = req.session.user || {};

    if (userAuthenticated) { return res.redirect("/"); };

    res.render("./pages/register");
};

const postRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const username = generateUsername(name);
        
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ name, email, password: hashedPassword, username });

        res.redirect("/login");
    } catch (error) {
        if (error.code === 11000) {
            if (error.keyPattern.email) {
                return res.status(400).send({ message: "This email is already associated with an account" });
            };

            if (error.keyPattern.username) {
                return res.status(400).send({ message: "This username is already in use" });
            };
        } else {
            return res.status(400).send({ message: `Failed to register user <br /> ${error.message}` });
        };

        console.log("postRegister: ", error.message);
        throw error;
    };
};

module.exports = {
    renderRegister,
    postRegister
};