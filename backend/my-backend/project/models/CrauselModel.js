const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Crausel = sequelize.define('Crausel', {
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Crausel;
