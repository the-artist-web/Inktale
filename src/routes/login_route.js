'use strict';

/**
 * node moduels
 */
const router = require("express").Router();

/**
 * custom modules
 */
const { renderLogin, postLogin } = require("../controllers/login_controller");

// GET route: Render the login form
router.get("/", renderLogin);

// POST route
router.post("/", postLogin);

module.exports = router;