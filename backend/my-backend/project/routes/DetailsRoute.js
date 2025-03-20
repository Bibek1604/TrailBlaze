const express = require('express');
const { addBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } = require('../controller/BlogController');

module.exports = (pool) => {
  const router = express.Router();

  router.post("/", addBlog(pool));  // Create a new blog
  router.get("/all", getAllBlogs(pool));  // Get all blogs
  router.get("/:id", getBlogById(pool));  // Get a blog by ID
  router.put("/:id", updateBlog(pool));  // Update a blog
  router.delete("/:id", deleteBlog(pool));  // Delete a blog

  return router;
};
