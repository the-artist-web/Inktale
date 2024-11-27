'use strict';

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user_model");
const Blog = require("../models/blog_model");
const uploadToCloudinary = require("../config/cloudinary_config");


const renderSettings = async (req, res) => {
    try {
        const { username } = req.session.user;

        const currentUser = await User.findOne({ username });

        res.render("./pages/settings", {
            sessionUser: req.session.user,
            currentUser
        });
    } catch (error) {
        console.error("Error ", error.message);
        throw error;
    };
};

const updateBasicInfo = async (req, res) => {
    try {
        const { username: sessionUsername } = req.session.user;

        const currentUser = await User.findOne({ username: sessionUsername })
        .select("profilePhoto name username email bio");

        const {
            profilePhoto,
            name,
            username,
            email,
            bio
        } = req.body;

        if (email) {
            if (await User.exists({ email })) {
                return res.status(400).json({ message: "Sorry, an account is already associated with this email address." });
            };

            currentUser.email = email;
        };

        if (username) {
            if (await User.exists({ username })) {
                return res.status(400).json({ message: "Sorry, that username is already taken. 90 Please choose a different one." });
            };

            currentUser.username = username;
            req.session.user.username = username;
        };

        if (profilePhoto) {
            const public_id = currentUser.username;
            const imageURL = await uploadToCloudinary(profilePhoto, public_id);

            currentUser.profilePhoto = {
                url: imageURL,
                public_id
            };
            req.session.user.profilePhoto = imageURL;
        };

        currentUser.name = name;
        req.session.user.name = name;
        currentUser.bio = bio;

        await currentUser.save();

        res.sendStatus(200);
    } catch (error) {
        console.error("Error Updating Basic Info: ", error.message);
        throw error;
    };
};

const updatePassword = async (req, res) => {
    try {
        const { username: sessionUsername } = req.session.user;

        const currentUser = await User.findOne({ username: sessionUsername })
        .select("password");

        const {
            old_password,
            password,
            confirm_password
        } = req.body;

        const oldPasswordIsValid = await bcrypt.compare(old_password, currentUser.password);

        if (!oldPasswordIsValid) {
            return res.status(400).json({ message: "Your old password is not valid." });
        };

        const newPassword = await bcrypt.hash(password, 10);
        currentUser.password = newPassword;

        await currentUser.save();

        res.sendStatus(200);
    } catch (error) {
        console.error("Error Updation Password: ", error.message);
        throw error;
    };
};

const deleteAccount = async (req, res) => {
    try {
        const { username } = req.session.user;

        const currentUser = await User.findOne({ username })
        .select("blogs");

        await Blog.deleteMany({ _id: { $in: currentUser.blogs } });

        await User.deleteOne({ username });

        const Session = mongoose.connection.db.collection("sessions");

        await Session.deleteMany({ session: { $regex: username, $options: "i" } });

        req.session.destroy();

        res.sendStatus(200);
    } catch (error) {
        console.error("Error Deleting Account: ", error.message);
        throw error;
    };
};

module.exports = {
    renderSettings,
    updateBasicInfo,
    updatePassword,
    deleteAccount
};