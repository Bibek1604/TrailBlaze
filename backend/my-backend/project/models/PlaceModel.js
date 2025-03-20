const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Place = sequelize.define('Place', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Categories', 
      key: 'id',
    },
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Place;
