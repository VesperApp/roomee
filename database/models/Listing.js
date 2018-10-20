const Sequelize = require('sequelize');
const db = require('../db');
const Photo = require('./Photo');

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

Listing.createListing = (listing, callback) => {
  Listing.create(listing, { include: [Photo] });
};

Listing.findListingsByZip = (queryStr, callback) => {
  queryStr.include = [{ model: Photo }, { model: User }];
  Listing.findAll(queryStr)
    .then(data => callback(null, data))
    .catch(err => {console.log(err); callback(err, null);});
};

Listing.findListingsByID = (id, callback) => {
  const queryStr = { where: { UserId: id }, include: [Photo, User] };
  Listing.findAll(queryStr)
    .then(data => callback(null, data))
    .catch(err => callback(err, null));
};

module.exports = Listing;