'use strict';

/**
 * node modules
 */
const express = require("express");
require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo");

/**
 * custom moduels
 */
const register = require("./src/routes/register_route");
const login = require("./src/routes/login_route");
const { connectDB, disconnectDB } = require("./src/config/mongoose_config");
const home = require("./src/routes/home_route");
const createBlog = require("./src/routes/create_blog_route");
const logout = require("./src/routes/logout_route");
const userAuth = require("./src/middlewares/user_auth_middlewares");
const blogDetail = require("./src/routes/blog_detail_route");
const redingList = require("./src/routes/reding_list_route");
const blogUpdate = require("./src/routes/blog_update_route");
const profile = require("./src/routes/profile_route");
const dashboard = require("./src/routes/dashboard_route");
const deleteBlog = require("./src/routes/blog_delete_route");
const settings = require("./src/routes/settings_route");

/**
 * initial express
 */
const app = express();

/**
 * setting view engine
 */
app.set("view engine", "ejs");

/**
 * set public directory
 */
app.use(express.static(`${__dirname}/public`));

/**
 * parse urlencoded body
 */
app.use(express.urlencoded({ extended: true }));

/**
 * parse json bodies
 */
app.use(express.json({ limit: '10mb' }));

/**
 * instace for session storage
 */
const store = new MongoStore({
    mongoUrl: process.env.MONGO_CONNECTION_URI,
    collectionName: "sessions",
    dbName: "inktale"
});

/**
 * initial express session
 */
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: { maxAge: Number(process.env.SESSION_MAX_AGE) }
}));

/**
 * Register page
 */
app.use("/register", register);

/**
 * login page
 */
app.use("/login", login);

/**
 * sign out
 */
app.use("/logout", logout);

/**
 * Home pages
 */
app.use("/", home);

/**
 * blog detail page
 */
app.use("/blogs", blogDetail);

/**
 * user authorization
 */
app.use(userAuth);

/**
 * create blog page
 */
app.use("/createblog", createBlog);

/**
 * reading list page
 */
app.use("/redinglist", redingList);

/**
 * blog update and blog delete
 */
app.use("/blogs", blogUpdate, deleteBlog);

/**
 * profile page
 */
app.use("/profile", profile);

/**
 * dashboard page
 */
app.use("/dashboard", dashboard);

/**
 * setting page
 */
app.use("/settings", settings);

/**
 * start server
 */
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
    console.log(`server listening on port http://localhost:${PORT}`);

    await connectDB(process.env.MONGO_CONNECTION_URI);
});

server.on("close", async () => await disconnectDB());