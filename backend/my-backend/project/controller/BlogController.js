const fs = require('fs');
const path = require('path');
const Blog = require('../models/BlogModel');

// Add Blog
const addBlog = (pool) => async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const image = req.files?.image ? req.files.image[0].path : null;

    if (!title || !content || !author || !image) {
      return res.status(400).json({ message: 'Title, content, author, and image are required!' });
    }

    const newBlog = await Blog.create({
      title,
      content,
      author,
      image,
    });

    res.status(201).json({ message: 'Blog added successfully!', blog: newBlog });
  } catch (error) {
    console.error('Error adding blog:', error);
    res.status(500).json({ message: 'Failed to add blog.' });
  }
};

// Get all Blogs
const getAllBlogs = (pool) => async (req, res) => {
  try {
    const result = await Blog.findAll(); // This fetches all blogs
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Failed to fetch blogs.' });
  }
};

// Get Blog by ID
const getBlogById = (pool) => async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Blog.findByPk(id);
    if (!result) {
      return res.status(404).json({ message: 'Blog not found.' });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Failed to fetch blog.' });
  }
};

// Update Blog
const updateBlog = (pool) => async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  const image = req.files?.image ? req.files.image[0].path : null;

  try {
    const existingBlog = await Blog.findByPk(id);
    if (!existingBlog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    const updatedBlog = await existingBlog.update({
      title: title || existingBlog.title,
      content: content || existingBlog.content,
      author: author || existingBlog.author,
      image: image || existingBlog.image,
    });

    res.status(200).json({ message: 'Blog updated successfully!', blog: updatedBlog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Failed to update blog.' });
  }
};

// Delete Blog
const deleteBlog = (pool) => async (req, res) => {
  const { id } = req.params;

  try {
    const existingBlog = await Blog.findByPk(id);
    if (!existingBlog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    if (existingBlog.image) {
      const fullPath = path.join(__dirname, '../', existingBlog.image);
      fs.unlink(fullPath, (err) => {
        if (err) console.error('Error deleting image:', err);
      });
    }

    await existingBlog.destroy();
    res.status(200).json({ message: 'Blog deleted successfully!' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Failed to delete blog.' });
  }
};

module.exports = { addBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
