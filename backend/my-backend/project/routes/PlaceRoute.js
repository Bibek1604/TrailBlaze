const express = require('express');
const { addPlace, getAllPlaces, getPlaceById, updatePlace, deletePlace } = require('../controller/PlaceController');

module.exports = (pool) => {
  const router = express.Router();

  router.post("/", addPlace(pool)); // Create a new place
  router.get("/all", getAllPlaces(pool)); // Get all places
  router.get("/:id", getPlaceById(pool)); // Get place by ID
  router.put("/:id", updatePlace(pool)); // Update a place
  router.delete("/:id", deletePlace(pool)); // Delete a place

  return router;
};
