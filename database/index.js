const bCrypt = require('bcrypt-nodejs');
const db = require('./db.js');

const User = require('./models/User');
const Listing = require('./models/Listing');
const Photo = require('./models/Photo');

db.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch(err => console.log('Unable to connect to the database:', err));

User.belongsToMany(Listing, {through: 'UserListings'});
Listing.belongsToMany(User, {through: 'UserListings'});
Listing.hasMany(Photo);

db.sync();

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


module.exports.sequelize = db;
module.exports.Listing = Listing;
module.exports.User = User;
