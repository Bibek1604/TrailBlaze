import React, { useState } from 'react';
import { useCategories } from '../hooks/useCategory';
import { usePlaces } from '../hooks/usePlace';
import axiosInstance from '../api/Index';

const AddDetails = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedPlaceId, setSelectedPlaceId] = useState('');
  const [error, setError] = useState(null);

  const [details, setDetails] = useState({
    name: '',
    location: '',
    difficulty: '',
    duration: '',
    tour_overview: '',
    tour_highlights: [''],
    whats_included: [{ item: '', description: '' }],
    itinerary: [{ day: '', title: '', description: '' }],
    recommendations: [{ title: '', description: '', image: null }],
    must_try_food: [{ title: '', short_description: '' }],
    recommended_guides: [{ name: '', description: '', image: null }],
    faqs: [{ question: '', answer: '' }],
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    map_image: null,
    locale_photo: null,
  });

  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: places, isLoading: placesLoading } = usePlaces();

  console.log('Categories:', categories);
  console.log('Places:', places);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}, selectedPlaceId: ${selectedPlaceId}`);
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSimpleArrayChange = (e, key, index) => {
    const { value } = e.target;
    const updatedArray = [...details[key]];
    updatedArray[index] = value;
    console.log(`Updating ${key}[${index}] to ${value}`);
    setDetails((prev) => ({ ...prev, [key]: updatedArray }));
  };

  const handleArrayChange = (e, key, index) => {
    const { name, value } = e.target;
    const updatedArray = [...details[key]];
    updatedArray[index] = { ...updatedArray[index], [name]: value };
    console.log(`Updating ${key}[${index}].${name} to ${value}`);
    setDetails((prev) => ({ ...prev, [key]: updatedArray }));
  };

  const handleFileChange = (e, key, index = null) => {
    const file = e.target.files[0];
    if (!file) return;
    console.log(`Selected file for ${key}${index !== null ? `[${index}]` : ''}:`, file);
    if (index === null) {
      setDetails((prev) => ({ ...prev, [key]: file }));
    } else {
      const updatedArray = [...details[key]];
      updatedArray[index] = { ...updatedArray[index], image: file };
      setDetails((prev) => ({ ...prev, [key]: updatedArray }));
    }
  };

  const handleAddItem = (key, defaultValue) => {
    setDetails((prev) => ({ ...prev, [key]: [...prev[key], defaultValue] }));
  };

  const handleRemoveItem = (key, index) => {
    const updatedArray = details[key].filter((_, i) => i !== index);
    setDetails((prev) => ({ ...prev, [key]: updatedArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!selectedCategoryId || !selectedPlaceId) {
      setError('Please select both a category and a place');
      return;
    }

    const formData = new FormData();
    Object.entries(details).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== null && value !== '') {
        formData.append(key, value);
      }
    });
    formData.append('category', selectedCategoryId);
    formData.append('place', selectedPlaceId);

    console.log('Submitting FormData:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await axiosInstance.post('/api/details/add/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Details added:', response.data);
      setDetails({
        name: '',
        location: '',
        difficulty: '',
        duration: '',
        tour_overview: '',
        tour_highlights: [''],
        whats_included: [{ item: '', description: '' }],
        itinerary: [{ day: '', title: '', description: '' }],
        recommendations: [{ title: '', description: '', image: null }],
        must_try_food: [{ title: '', short_description: '' }],
        recommended_guides: [{ name: '', description: '', image: null }],
        faqs: [{ question: '', answer: '' }],
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null,
        map_image: null,
        locale_photo: null,
      });
      setSelectedCategoryId('');
      setSelectedPlaceId('');
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message;
      console.error('Error submitting details:', errorMsg);
      setError(`Submission failed: ${errorMsg}`);
    }
  };

  const filteredPlaces = places?.filter(place => place.category_id === parseInt(selectedCategoryId)) || [];

  // Debugging logs
  console.log('SelectedCategoryId:', selectedCategoryId);
  console.log('Filtered Places:', filteredPlaces);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Add Tour Details</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Selection */}
        <div className="space-y-2">
          <label className="block text-lg">Select Category</label>
          {categoriesLoading ? (
            <p>Loading categories...</p>
          ) : !categories || categories.length === 0 ? (
            <p>No categories available</p>
          ) : (
            <select
              value={selectedCategoryId}
              onChange={(e) => {
                console.log('Selected category:', e.target.value);
                setSelectedCategoryId(e.target.value);
              }}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Place Selection */}
        <div className="space-y-2">
          <label className="block text-lg">Select Place</label>
          {placesLoading ? (
            <p>Loading places...</p>
          ) : !filteredPlaces || filteredPlaces.length === 0 ? (
            <p>No places available for this category</p>
          ) : (
            <select
              value={selectedPlaceId}
              onChange={(e) => {
                console.log('Selected place:', e.target.value);
                setSelectedPlaceId(e.target.value);
              }}
              className="w-full p-2 border rounded"
              disabled={!selectedCategoryId}
              required
            >
              <option value="">Select a place</option>
              {filteredPlaces.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Name */}
        <div className="space-y-2">
          <label className="block text-lg">Tour Name</label>
          <input
            type="text"
            name="name"
            value={details.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            disabled={!selectedPlaceId}
            required
          />
        </div>

        {/* Name */}
        <div className="space-y-2">
          <label className="block text-lg">Tour Name</label>
          <input
            type="text"
            name="name"
            value={details.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            disabled={!selectedPlaceId}
            required
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="block text-lg">Location</label>
          <input
            type="text"
            name="location"
            value={details.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            disabled={!selectedPlaceId}
            required
          />
        </div>

        {/* Difficulty */}
        <div className="space-y-2">
          <label className="block text-lg">Difficulty</label>
          <input
            type="text"
            name="difficulty"
            value={details.difficulty}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            disabled={!selectedPlaceId}
            required
          />
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label className="block text-lg">Duration (days)</label>
          <input
            type="number"
            name="duration"
            value={details.duration}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            disabled={!selectedPlaceId}
            required
          />
        </div>

        {/* Tour Overview */}
        <div className="space-y-2">
          <label className="block text-lg">Tour Overview</label>
          <textarea
            name="tour_overview"
            value={details.tour_overview}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            disabled={!selectedPlaceId}
            required
          />
        </div>

        {/* Image Fields (image1 to image5) */}
        {['image1', 'image2', 'image3', 'image4', 'image5'].map((imageField) => (
          <div key={imageField} className="space-y-2">
            <label className="block text-lg">{`Image ${imageField.slice(-1)}`}</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, imageField)}
              className="w-full p-2 border rounded"
              disabled={!selectedPlaceId}
            />
            {details[imageField] && (
              <div className="mt-2">
                <p className="text-sm">Selected: {details[imageField].name} ({(details[imageField].size / 1024).toFixed(2)} KB)</p>
                <img
                  src={URL.createObjectURL(details[imageField])}
                  alt={`${imageField} Preview`}
                  className="w-24 h-24 object-cover mt-1"
                />
              </div>
            )}
          </div>
        ))}

        {/* Map Image */}
        <div className="space-y-2">
          <label className="block text-lg">Map Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'map_image')}
            className="w-full p-2 border rounded"
            disabled={!selectedPlaceId}
          />
          {details.map_image && (
            <div className="mt-2">
              <p className="text-sm">Selected: {details.map_image.name} ({(details.map_image.size / 1024).toFixed(2)} KB)</p>
              <img
                src={URL.createObjectURL(details.map_image)}
                alt="Map Preview"
                className="w-24 h-24 object-cover mt-1"
              />
            </div>
          )}
        </div>

        {/* Locale Photo (New Field) */}
        <div className="space-y-2">
          <label className="block text-lg">Locale Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'locale_photo')}
            className="w-full p-2 border rounded"
            disabled={!selectedPlaceId}
          />
          {details.locale_photo && (
            <div className="mt-2">
              <p className="text-sm">Selected: {details.locale_photo.name} ({(details.locale_photo.size / 1024).toFixed(2)} KB)</p>
              <img
                src={URL.createObjectURL(details.locale_photo)}
                alt="Locale Photo Preview"
                className="w-24 h-24 object-cover mt-1"
              />
            </div>
          )}
        </div>

        {/* Tour Highlights */}
        <div className="space-y-2">
          <label className="block text-lg">Tour Highlights</label>
          {details.tour_highlights.map((highlight, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                value={highlight}
                onChange={(e) => handleSimpleArrayChange(e, 'tour_highlights', index)}
                className="w-full p-2 border rounded"
                placeholder="Add a highlight"
                disabled={!selectedPlaceId}
              />
              <button
                type="button"
                onClick={() => handleRemoveItem('tour_highlights', index)}
                className="p-2 bg-red-500 text-white rounded"
                disabled={!selectedPlaceId}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem('tour_highlights', '')}
            className="p-2 bg-blue-500 text-white rounded"
            disabled={!selectedPlaceId}
          >
            Add Highlight
          </button>
        </div>

        {/* What's Included */}
        <div className="space-y-2">
          <label className="block text-lg">What's Included</label>
          {details.whats_included.map((item, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                name="item"
                value={item.item}
                onChange={(e) => handleArrayChange(e, 'whats_included', index)}
                className="w-full p-2 border rounded"
                placeholder="Item"
                disabled={!selectedPlaceId}
              />
              <input
                type="text"
                name="description"
                value={item.description}
                onChange={(e) => handleArrayChange(e, 'whats_included', index)}
                className="w-full p-2 border rounded"
                placeholder="Description"
                disabled={!selectedPlaceId}
              />
              <button
                type="button"
                onClick={() => handleRemoveItem('whats_included', index)}
                className="p-2 bg-red-500 text-white rounded"
                disabled={!selectedPlaceId}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem('whats_included', { item: '', description: '' })}
            className="p-2 bg-blue-500 text-white rounded"
            disabled={!selectedPlaceId}
          >
            Add Item
          </button>
        </div>

        {/* Itinerary */}
        <div className="space-y-2">
          <label className="block text-lg">Itinerary</label>
          {details.itinerary.map((dayItem, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                name="day"
                value={dayItem.day}
                onChange={(e) => handleArrayChange(e, 'itinerary', index)}
                className="w-full p-2 border rounded"
                placeholder="Day"
                disabled={!selectedPlaceId}
              />
              <input
                type="text"
                name="title"
                value={dayItem.title}
                onChange={(e) => handleArrayChange(e, 'itinerary', index)}
                className="w-full p-2 border rounded"
                placeholder="Title"
                disabled={!selectedPlaceId}
              />
              <input
                type="text"
                name="description"
                value={dayItem.description}
                onChange={(e) => handleArrayChange(e, 'itinerary', index)}
                className="w-full p-2 border rounded"
                placeholder="Description"
                disabled={!selectedPlaceId}
              />
              <button
                type="button"
                onClick={() => handleRemoveItem('itinerary', index)}
                className="p-2 bg-red-500 text-white rounded"
                disabled={!selectedPlaceId}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem('itinerary', { day: '', title: '', description: '' })}
            className="p-2 bg-blue-500 text-white rounded"
            disabled={!selectedPlaceId}
          >
            Add Itinerary Item
          </button>
        </div>

        {/* Recommendations */}
        <div className="space-y-2">
          <label className="block text-lg">Recommendations</label>
          {details.recommendations.map((recommendation, index) => (
            <div key={index} className="flex flex-col space-y-2 border p-4 rounded">
              <input
                type="text"
                name="title"
                value={recommendation.title}
                onChange={(e) => handleArrayChange(e, 'recommendations', index)}
                className="w-full p-2 border rounded"
                placeholder="Title"
                disabled={!selectedPlaceId}
              />
              <input
                type="text"
                name="description"
                value={recommendation.description}
                onChange={(e) => handleArrayChange(e, 'recommendations', index)}
                className="w-full p-2 border rounded"
                placeholder="Description"
                disabled={!selectedPlaceId}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'recommendations', index)}
                className="w-full p-2 border rounded"
                disabled={!selectedPlaceId}
              />
              {recommendation.image && (
                <div className="mt-2">
                  <p className="text-sm">Selected: {recommendation.image.name} ({(recommendation.image.size / 1024).toFixed(2)} KB)</p>
                  <img
                    src={URL.createObjectURL(recommendation.image)}
                    alt="Recommendation Preview"
                    className="w-24 h-24 object-cover mt-1"
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => handleRemoveItem('recommendations', index)}
                className="p-2 bg-red-500 text-white rounded self-start"
                disabled={!selectedPlaceId}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem('recommendations', { title: '', description: '', image: null })}
            className="p-2 bg-blue-500 text-white rounded"
            disabled={!selectedPlaceId}
          >
            Add Recommendation
          </button>
        </div>

        {/* Must Try Food */}
        <div className="space-y-2">
          <label className="block text-lg">Must Try Food</label>
          {details.must_try_food.map((food, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                name="title"
                value={food.title}
                onChange={(e) => handleArrayChange(e, 'must_try_food', index)}
                className="w-full p-2 border rounded"
                placeholder="Title"
                disabled={!selectedPlaceId}
              />
              <input
                type="text"
                name="short_description"
                value={food.short_description}
                onChange={(e) => handleArrayChange(e, 'must_try_food', index)}
                className="w-full p-2 border rounded"
                placeholder="Short Description"
                disabled={!selectedPlaceId}
              />
              <button
                type="button"
                onClick={() => handleRemoveItem('must_try_food', index)}
                className="p-2 bg-red-500 text-white rounded"
                disabled={!selectedPlaceId}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem('must_try_food', { title: '', short_description: '' })}
            className="p-2 bg-blue-500 text-white rounded"
            disabled={!selectedPlaceId}
          >
            Add Must Try Food
          </button>
        </div>

        {/* Recommended Guides */}
        <div className="space-y-2">
          <label className="block text-lg">Recommended Guides</label>
          {details.recommended_guides.map((guide, index) => (
            <div key={index} className="flex flex-col space-y-2 border p-4 rounded">
              <input
                type="text"
                name="name"
                value={guide.name}
                onChange={(e) => handleArrayChange(e, 'recommended_guides', index)}
                className="w-full p-2 border rounded"
                placeholder="Guide Name"
                disabled={!selectedPlaceId}
              />
              <input
                type="text"
                name="description"
                value={guide.description}
                onChange={(e) => handleArrayChange(e, 'recommended_guides', index)}
                className="w-full p-2 border rounded"
                placeholder="Guide Description"
                disabled={!selectedPlaceId}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'recommended_guides', index)}
                className="w-full p-2 border rounded"
                disabled={!selectedPlaceId}
              />
              {guide.image && (
                <div className="mt-2">
                  <p className="text-sm">Selected: {guide.image.name} ({(guide.image.size / 1024).toFixed(2)} KB)</p>
                  <img
                    src={URL.createObjectURL(guide.image)}
                    alt="Guide Preview"
                    className="w-24 h-24 object-cover mt-1"
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => handleRemoveItem('recommended_guides', index)}
                className="p-2 bg-red-500 text-white rounded self-start"
                disabled={!selectedPlaceId}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem('recommended_guides', { name: '', description: '', image: null })}
            className="p-2 bg-blue-500 text-white rounded"
            disabled={!selectedPlaceId}
          >
            Add Recommended Guide
          </button>
        </div>

        {/* FAQs */}
        <div className="space-y-2">
          <label className="block text-lg">FAQs</label>
          {details.faqs.map((faq, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                name="question"
                value={faq.question}
                onChange={(e) => handleArrayChange(e, 'faqs', index)}
                className="w-full p-2 border rounded"
                placeholder="Question"
                disabled={!selectedPlaceId}
              />
              <input
                type="text"
                name="answer"
                value={faq.answer}
                onChange={(e) => handleArrayChange(e, 'faqs', index)}
                className="w-full p-2 border rounded"
                placeholder="Answer"
                disabled={!selectedPlaceId}
              />
              <button
                type="button"
                onClick={() => handleRemoveItem('faqs', index)}
                className="p-2 bg-red-500 text-white rounded"
                disabled={!selectedPlaceId}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem('faqs', { question: '', answer: '' })}
            className="p-2 bg-blue-500 text-white rounded"
            disabled={!selectedPlaceId}
          >
            Add FAQ
          </button>
        </div>

        {/* Submit */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={!selectedPlaceId}
          >
            Submit Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDetails;
