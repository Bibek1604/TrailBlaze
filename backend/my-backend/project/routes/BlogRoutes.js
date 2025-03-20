const express = require('express');
const { addBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } = require('../controller/BlogController');
const upload = require('../middlewear/upload');  // Corrected the typo here

module.exports = (pool) => {
  const router = express.Router();

  // Create a new blog post
  router.post("/", upload, addBlog(pool));  // Handles image uploads with the upload middleware

  // Get all blog posts
  router.get("/all", getAllBlogs(pool));

  // Get a specific blog post by ID
  router.get("/:id", getBlogById(pool));

  // Update an existing blog post by ID
  router.put("/:id", upload, updateBlog(pool));  // Handles image uploads with the upload middleware

  // Delete a blog post by ID
  router.delete("/:id", deleteBlog(pool));

  return router;
};
