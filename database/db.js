const Sequelize = require('sequelize');

const db = new Sequelize('roomee', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 1,
    acquire: 30000,
    idle: 1
  }
});

module.exports = db;