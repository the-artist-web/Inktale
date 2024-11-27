'use strict';

/**
 * node modules
 */
const mongoose = require("mongoose");

const clientOptions = {
    serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true
    },
    dbName: "inktale"
};

const connectDB = async (connectionURI) => {
    try {
        await mongoose.connect(connectionURI, clientOptions);
        console.log("Connected to mongodb");
    } catch (error) {
        console.error("Error Connecting To MongoDB", error.message);
        throw error;
    };
};

const  disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log("Disconnected from mongodb");
    } catch (error) {
        console.error("Error Disconnecting From MongoDB", error.message);
        throw error;
    };
};

module.exports = {
    connectDB,
    disconnectDB
};