'use strict';

/**
 * node moduels
 */
const router = require("express").Router();

/**
 * custom modules
 */
const renderBlogDetail = require("../controllers/blog_detail_controller");
const { updateReaction, deleteReaction } = require("../controllers/reaction_controller");
const { addToReadingList, removeFromReadingList } = require("../controllers/reading_list_controller");
const updateVisit = require("../controllers/update_visit_controller");

router.get("/:blogId", renderBlogDetail);

router.put("/:blogId/reactions", updateReaction);

router.delete("/:blogId/reactions", deleteReaction);

//{{{_*_}}}\\ --------------------------------------------- //{{{_*_}}}\\

router.put("/:blogId/readingList", addToReadingList);

router.delete("/:blogId/readingList", removeFromReadingList);

//{{{_*_}}}\\ --------------------------------------------- //{{{_*_}}}\\

router.put("/:blogId/visit", updateVisit);

module.exports = router;