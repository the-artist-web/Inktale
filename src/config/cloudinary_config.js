'use strict';

/**
 * node module
 */

// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

/**
 * Configures Cloudinary settings for image uploads.
 */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary =async (image, public_id) => {
    try {
        const response = await cloudinary.uploader.upload(image, {
            resource_type: "auto",
            public_id
        });

        return response.secure_url;
    } catch (error) {
        console.log("Error Uploading Image To Cloudinary: ", error.message);
        throw error;
    };
};

module.exports = uploadToCloudinary;