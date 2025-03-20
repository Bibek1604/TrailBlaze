const fs = require('fs');
const path = require('path');
const Details = require('../models/DetailsModel');

// Add Details
const addDetails = (pool) => async (req, res) => {
  try {
    const { 
      name, 
      location, 
      difficulty, 
      duration, 
      tour_overview, 
      tour_highlights, 
      whats_included, 
      itinerary, 
      recommendations, 
      must_try_food, 
      recommended_guides, 
      faqs, 
      category, 
      place 
    } = req.body;

    // Handle images (assuming you've set up file uploads with Multer)
    const image1 = req.files?.image1 ? req.files.image1[0].path : null;
    const image2 = req.files?.image2 ? req.files.image2[0].path : null;
    const image3 = req.files?.image3 ? req.files.image3[0].path : null;
    const image4 = req.files?.image4 ? req.files.image4[0].path : null;
    const image5 = req.files?.image5 ? req.files.image5[0].path : null;
    const map_image = req.files?.map_image ? req.files.map_image[0].path : null;

    if (!name || !location || !difficulty || !duration || !tour_overview || !tour_highlights || !whats_included || !itinerary || !recommendations || !must_try_food || !category || !place) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const newDetails = await Details.create({
      name, 
      location, 
      difficulty, 
      duration, 
      tour_overview, 
      tour_highlights, 
      whats_included, 
      itinerary, 
      recommendations, 
      must_try_food, 
      recommended_guides,
      faqs, 
      category, 
      place, 
      image1, 
      image2, 
      image3, 
      image4, 
      image5,
      map_image
    });

    res.status(201).json({ message: 'Details added successfully!', details: newDetails });
  } catch (error) {
    console.error('Error adding details:', error);
    res.status(500).json({ message: 'Failed to add details.' });
  }
};

// Get all Details
const getAllDetails = (pool) => async (req, res) => {
  try {
    const result = await Details.findAll(); // This fetches all details
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching details:', error);
    res.status(500).json({ message: 'Failed to fetch details.' });
  }
};

// Get Detail by ID
const getDetailById = (pool) => async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Details.findByPk(id);
    if (!result) {
      return res.status(404).json({ message: 'Details not found.' });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching details:', error);
    res.status(500).json({ message: 'Failed to fetch details.' });
  }
};

// Update Details
const updateDetails = (pool) => async (req, res) => {
  const { id } = req.params;
  const { 
    name, 
    location, 
    difficulty, 
    duration, 
    tour_overview, 
    tour_highlights, 
    whats_included, 
    itinerary, 
    recommendations, 
    must_try_food, 
    recommended_guides, 
    faqs, 
    category, 
    place 
  } = req.body;

  // Handle image uploads
  const image1 = req.files?.image1 ? req.files.image1[0].path : null;
  const image2 = req.files?.image2 ? req.files.image2[0].path : null;
  const image3 = req.files?.image3 ? req.files.image3[0].path : null;
  const image4 = req.files?.image4 ? req.files.image4[0].path : null;
  const image5 = req.files?.image5 ? req.files.image5[0].path : null;
  const map_image = req.files?.map_image ? req.files.map_image[0].path : null;

  try {
    const existingDetail = await Details.findByPk(id);
    if (!existingDetail) {
      return res.status(404).json({ message: 'Details not found.' });
    }

    const updatedDetail = await existingDetail.update({
      name,
      location,
      difficulty,
      duration,
      tour_overview,
      tour_highlights,
      whats_included,
      itinerary,
      recommendations,
      must_try_food,
      recommended_guides,
      faqs,
      category,
      place,
      image1: image1 || existingDetail.image1,
      image2: image2 || existingDetail.image2,
      image3: image3 || existingDetail.image3,
      image4: image4 || existingDetail.image4,
      image5: image5 || existingDetail.image5,
      map_image: map_image || existingDetail.map_image
    });

    res.status(200).json({ message: 'Details updated successfully!', details: updatedDetail });
  } catch (error) {
    console.error('Error updating details:', error);
    res.status(500).json({ message: 'Failed to update details.' });
  }
};

// Delete Details
const deleteDetails = (pool) => async (req, res) => {
  const { id } = req.params;

  try {
    const existingDetail = await Details.findByPk(id);
    if (!existingDetail) {
      return res.status(404).json({ message: 'Details not found.' });
    }

    // Delete images from filesystem
    const imagePaths = [
      existingDetail.image1,
      existingDetail.image2,
      existingDetail.image3,
      existingDetail.image4,
      existingDetail.image5,
      existingDetail.map_image,
    ];

    imagePaths.forEach(imagePath => {
      if (imagePath) {
        const fullPath = path.join(__dirname, '../', imagePath);
        fs.unlink(fullPath, (err) => {
          if (err) console.error('Error deleting image:', err);
        });
      }
    });

    await existingDetail.destroy();
    res.status(200).json({ message: 'Details deleted successfully!' });
  } catch (error) {
    console.error('Error deleting details:', error);
    res.status(500).json({ message: 'Failed to delete details.' });
  }
};

module.exports = { addDetails, getAllDetails, getDetailById, updateDetails, deleteDetails };
