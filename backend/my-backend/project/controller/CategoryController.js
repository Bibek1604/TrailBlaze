const { Category } = require('../models/CategoryModel'); // Assuming models/index.js exports Category
const fs = require('fs');
const path = require('path');
const axiosInstance = require('../config/axiosInstance');

// Add Category
const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Example request using axiosInstance
    const response = await axiosInstance.post('/categories', { name, imageUrl });

    res.status(201).json({ message: 'Category added successfully', data: response.data });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ message: 'Error adding category', error: error.message });
  }
};

module.exports = { addCategory };


// Get All Categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ order: [['id', 'ASC']] });
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Failed to fetch categories.' });
  }
};

// Get Category by ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: 'Category not found.' });
    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Failed to fetch category.' });
  }
};

// Update Category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: 'Category not found.' });

    if (image && category.image) {
      fs.unlink(path.join(__dirname, '../', category.image), (err) => {
        if (err) console.error('Error deleting old image:', err);
      });
    }

    category.name = name || category.name;
    category.image = image || category.image;
    await category.save();

    res.status(200).json({ message: 'Category updated successfully!', category });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Failed to update category.' });
  }
};

// Delete Category
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: 'Category not found.' });

    if (category.image) {
      fs.unlink(path.join(__dirname, '../', category.image), (err) => {
        if (err) console.error('Error deleting image:', err);
      });
    }

    await category.destroy();
    res.status(200).json({ message: 'Category deleted successfully!' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Failed to delete category.' });
  }
};

module.exports = { addCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory };
