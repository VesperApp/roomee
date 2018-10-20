const { Sequelize } = require('sequelize');
const db = require('../db');

const Listing = db.define('listing', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  title: Sequelize.STRING,
  address: Sequelize.STRING,
  address2: Sequelize.STRING,
  city: Sequelize.STRING,
  stateAbbr: Sequelize.STRING,
  zipCode: Sequelize.STRING,
  lat: Sequelize.DECIMAL(9, 6),
  lon: Sequelize.DECIMAL(9, 6),
  description: Sequelize.TEXT,
  price: Sequelize.INTEGER,
});

module.exports = Listing;
