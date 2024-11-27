'use strict';

/**
 * node moduels
 */
const router = require("express").Router();

/**
 * custom modules
 */
const renderHome = require("../controllers/home_controller");

// GET route: Render the home page
router.get(["/", "/page/:pageNumber"], renderHome);

module.exports = router;