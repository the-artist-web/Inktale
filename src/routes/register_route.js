'use strict';

/**
 * node moduels
 */
const router = require("express").Router();

/**
 * custom modules
 */
const { renderRegister, postRegister } = require("../controllers/register_controller");

// GET route: Render the registration form
router.get("/", renderRegister);

// POST route: Handles form submission for user registration._
router.post("/", postRegister);

module.exports = router;