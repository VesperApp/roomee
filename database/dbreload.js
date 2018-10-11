const Sequelize = require('sequelize');
const db = require('./db.js');

db.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch(err => console.log('Unable to connect to the database:', err));

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
  about: Sequelize.TEXT,
  email: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_login: Sequelize.DATE,
});

const Listing = db.define('listing', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  title: { type: Sequelize.STRING },
  address: { type: Sequelize.STRING },
  address2: { type: Sequelize.STRING },
  city: { type: Sequelize.STRING },
  stateAbbr: { type: Sequelize.STRING },
  zipCode: { type: Sequelize.STRING },
  lat: { type: Sequelize.DECIMAL(9, 6) },
  lon: { type: Sequelize.DECIMAL(9, 6) },
  description: { type: Sequelize.TEXT },
  price: { type: Sequelize.INTEGER },
});

const Photo = db.define('photo', {
  title: Sequelize.STRING,
  url: Sequelize.STRING,
});

User.hasMany(Listing);
Listing.hasMany(Photo);
db.sync({ force: true });

setTimeout(function() {
  return process.exit(0);
}, 5000);
