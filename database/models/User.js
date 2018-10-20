const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  about: Sequelize.TEXT,
  email: Sequelize.STRING,
  zipCode: Sequelize.STRING,
  gender: Sequelize.BOOLEAN,
  age: Sequelize.INTEGER,
});

module.exports = User;
