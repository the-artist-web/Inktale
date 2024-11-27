"use strict";

/**
 * node modules
 */
const mongoose = require("mongoose");

/**
 * Mongoose shema for user data
 */
const UserSchema = new mongoose.Schema({
    profilePhoto: {
        url: String,
        public_id: String
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    bio: String,
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    blogs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Blog"
    },
    blogPublished: {
        type: Number,
        default: 0
    },
    reactedBlogs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Blog"
    },
    totalVisits: {
        type: Number,
        default: 0
    },
    totalReactions: {
        type: Number,
        default: 0
    },
    readingList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Blog"
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", UserSchema);