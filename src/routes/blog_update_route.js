'use strict';

const router = require("express").Router();

const { renderBlogEdit, updateBlog } = require("../controllers/render_blog_edit_controller");

router.get("/:blogId/edit", renderBlogEdit);

router.put("/:blogId/edit", updateBlog);

module.exports = router;