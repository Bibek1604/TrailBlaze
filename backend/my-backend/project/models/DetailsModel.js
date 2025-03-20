const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Details = sequelize.define('Details', {
  image1: { type: DataTypes.STRING, allowNull: false },
  image2: { type: DataTypes.STRING, allowNull: false },
  image3: { type: DataTypes.STRING, allowNull: false },
  image4: { type: DataTypes.STRING, allowNull: false },
  image5: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  difficulty: { type: DataTypes.STRING, allowNull: false },
  duration: { type: DataTypes.INTEGER, allowNull: false },
  tour_overview: { type: DataTypes.STRING, allowNull: false },
  tour_highlights: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
  whats_included: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: true
  },
  itinerary: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
  map_image: { type: DataTypes.STRING, defaultValue: null },
  recommendations: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
  must_try_food: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
  recommended_guides: { 
    type: DataTypes.ARRAY(DataTypes.INTEGER), 
    allowNull: true 
  },
  faqs: { type: DataTypes.ARRAY(DataTypes.JSONB), allowNull: true },
  category: { 
    type: DataTypes.INTEGER, 
    references: { model: 'Categories', key: 'id' }, 
    allowNull: false 
  },
  place: { 
    type: DataTypes.INTEGER, 
    references: { model: 'Places', key: 'id' }, 
    allowNull: false 
  },
}, { timestamps: true });

module.exports = Details;
