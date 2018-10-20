const bCrypt = require('bcrypt-nodejs');
const db = require('./db.js');

const User = require('./models/User');
const Listing = require('./models/Listing');
const Photo = require('./models/Photo');

db.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch(err => console.log('Unable to connect to the database:', err));

User.hasMany(Listing);
Listing.hasMany(Photo);
Listing.User = Listing.belongsTo(User);

// TODO: Set force to false before deployment.
db.sync({ force: true });


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

// this code correctly creates instances with association between listing and photos:
Listing.createListing2 = (listing, callback) => {
  Listing.create(listing, { include: [Photo] });
};

// //ED TEST: for 'Listing.createListing2' function -> many photos to one relationship:
// Listing.createListing2({
//   title: 'this is a test123',
//   address: 'test',
//   address2: "TESTY",
//   city: "TESTY",
//   stateAbbr: "TESTY",
//   zipCode: "TESTY",
//   // lat: "TESTY",
//   // lon: "TESTY",
//   description: "TESTY",
//   price: 444,
//   photos: [
//     {url: 'www.heesdfhee.com'},
//     {url: 'www.hee33hee.com'},
//     {url: 'www.heeh33ee.com'},
//     {url: 'www.333.com'},
//   ]
// },function(ele){console.log(ele)});

Listing.createListing = (listing, callback) => {
  Listing.create(listing)
    .then(
      data =>
        // {
        // if (listing.photos.length > 0) {
        //   const listingResult = data;
        //   const photos = listing.photos.map(url => {
        //     const p = { url, listingId: listingResult.id };
        //     return p;
        //   });
        //   Photo.bulkCreate(photos).then(() => Listing.findListingsByID(listingResult.id, callback) );

        // } else {
        callback(data)
      // }
      // }
    )
    .catch(err => callback(err));
};
// ED TEST: for 'Listing.createListing' function [old function to be deleted]
// var test = { title: 'user favorites connected to sessions',
//   address: '',
//   city: '',
//   stateAbbr: '',
//   zipCode: '',
//   price: '',
//   description: '',
//   photos: [],
//   redirect: false
// }
// Listing.createListing = (test, function(ele){console.log(ele);})

User.findbyUsername = (username, callback) => {
  User.findOne({ where: { username } })
    .then(data => callback(null, data))
    .catch(err => callback(err, null));
};

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
