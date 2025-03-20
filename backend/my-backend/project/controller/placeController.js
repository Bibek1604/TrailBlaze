const fs = require('fs');
const path = require('path');
const Place = require('../models/PlaceModel');

// Add Place
const addPlace = (pool) => async (req, res) => {
  try {
    const { name, location, description, category } = req.body;
    const image = req.file ? req.file.path : null;

    if (!name || !location || !category) {
      return res.status(400).json({ message: 'Name, location, and category are required!' });
    }

    const newPlace = await pool.query(
      'INSERT INTO places (name, location, description, category, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, location, description, category, image]
    );

    res.status(201).json({ message: 'Place added successfully!', place: newPlace.rows[0] });
  } catch (error) {
    console.error('Error adding place:', error);
    res.status(500).json({ message: 'Failed to add place.' });
  }
};

// Get all Places
const getAllPlaces = (pool) => async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM places ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ message: 'Failed to fetch places.' });
  }
};

// Get Place by ID
const getPlaceById = (pool) => async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query('SELECT * FROM places WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Place not found.' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching place:', error);
    res.status(500).json({ message: 'Failed to fetch place.' });
  }
};

// Update Place
const updatePlace = (pool) => async (req, res) => {
  const { id } = req.params;
  const { name, location, description, category } = req.body;
  const image = req.file ? req.file.path : null;

  if (!id) {
    return res.status(400).json({ message: 'Place ID is required.' });
  }

  try {
    const existingPlace = await pool.query('SELECT * FROM places WHERE id = $1', [id]);
    if (existingPlace.rows.length === 0) {
      return res.status(404).json({ message: 'Place not found.' });
    }

    const updatedName = name || existingPlace.rows[0].name;
    const updatedLocation = location || existingPlace.rows[0].location;
    const updatedDescription = description || existingPlace.rows[0].description;
    const updatedCategory = category || existingPlace.rows[0].category;
    const updatedImage = image || existingPlace.rows[0].image;

    const result = await pool.query(
      'UPDATE places SET name = $1, location = $2, description = $3, category = $4, image = $5 WHERE id = $6 RETURNING *',
      [updatedName, updatedLocation, updatedDescription, updatedCategory, updatedImage, id]
    );

    res.status(200).json({ message: 'Place updated successfully!', place: result.rows[0] });
  } catch (error) {
    console.error('Error updating place:', error);
    res.status(500).json({ message: 'Failed to update place.' });
  }
};

// Delete Place
const deletePlace = (pool) => async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Place ID is required.' });
  }

  try {
    const placeResult = await pool.query('SELECT * FROM places WHERE id = $1', [id]);
    if (placeResult.rows.length === 0) {
      return res.status(404).json({ message: 'Place not found.' });
    }

    const deletedPlace = placeResult.rows[0];

    await pool.query('DELETE FROM places WHERE id = $1', [id]);

    if (deletedPlace.image) {
      const imagePath = path.join(__dirname, '../', deletedPlace.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Error deleting image:', err);
      });
    }

    res.status(200).json({ message: 'Place deleted successfully!' });
  } catch (error) {
    console.error('Error deleting place:', error);
    res.status(500).json({ message: 'Failed to delete place.' });
  }
};

module.exports = { addPlace, getAllPlaces, getPlaceById, updatePlace, deletePlace };
