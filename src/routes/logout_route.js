'use strict';

/**
 * node moduels
 */
const router = require("express").Router();

/**
 * custom modules
 */
const logout = require("../controllers/logout_controller");

// POST route
router.post("/", logout);

module.exports = router;