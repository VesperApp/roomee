const Sequelize = require('sequelize');
const db = require('../db');

const Photo = db.define('photo', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  url: Sequelize.STRING,
});

module.exports = Photo;