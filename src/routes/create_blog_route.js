'use strict';

/**
 * node moduels
 */
const router = require("express").Router();

/**
 * custom modules
 */
const { renderCreateBlog, postCreateBlog } = require("../controllers/create_blog_controller");

router.get("/", renderCreateBlog);

router.post("/", postCreateBlog);

module.exports = router;