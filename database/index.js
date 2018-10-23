const db = require('./db.js');

const User = require('./models/User');
const Listing = require('./models/Listing');
const Photo = require('./models/Photo');

db.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch(err => console.log('Unable to connect to the database:', err));

User.hasMany(Listing);
Listing.belongsTo(User);

Listing.hasMany(Photo);

db.sync();

module.exports = {
  sequelize: db,
  Listing,
  User,
  Photo,
};
