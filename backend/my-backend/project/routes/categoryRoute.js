const express = require('express');
const upload = require('../middlewear/upload');
const {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controller/CategoryController');

module.exports = (pool) => {
  const router = express.Router();

  router.post('/', upload, addCategory); // ✅ No need to call single('image') here
  router.get('/all', getAllCategories);
  router.get('/:id', getCategoryById);
  router.put('/:id', upload, updateCategory); // ✅ Same here
  router.delete('/:id', deleteCategory);

  return router;
};
