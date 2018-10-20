const bCrypt = require('bcrypt-nodejs');
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

User.createUser = (newUser, callback) => {
  bCrypt.genSalt(14, function(err, salt) {
    bCrypt.hash(newUser.password, salt, null, (err, hash) => {
      newUser.password = hash;
      User.create(newUser)
        .then(data => callback(null, data))
        .catch(err => callback(err, null));
    });
  });
};

User.findbyUsername = (username, callback) => {
  User.findOne({ where: { username } })
    .then(data => callback(null, data))
    .catch(err => callback(err, null));
};

User.validateLogin = (username, password, callback) => {
  User.findOne({ where: { username } })
    .then(data =>
      bCrypt.compare(password, data.password, (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result ? data.id : false);
        }
      })
    )
    .catch(err => callback(err, null));
};

module.exports = User;