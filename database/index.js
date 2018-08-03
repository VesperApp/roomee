const Sequelize = require('sequelize');
const bCrypt = require('bcrypt-nodejs');
const db = require('./db.js');
const Op = Sequelize.Op;
const operatorsAliases = { $like: Op.like };

db.authenticate()
  .then(() => console.log('Database connection has been established successfully.') )
  .catch(err => console.log('Unable to connect to the database:', err));

const User = db.define('user', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  about: Sequelize.TEXT,
  email: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_login: Sequelize.DATE
});

const FBUser = db.define('fbuser', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  about: Sequelize.TEXT,
  email: Sequelize.STRING,
  last_login: Sequelize.DATE
});

const Listing = db.define('listing', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  title: Sequelize.STRING,
  address: Sequelize.STRING,
  address2: Sequelize.STRING,
  city: Sequelize.STRING,
  stateAbbr: Sequelize.STRING,
  zipCode: Sequelize.STRING,
  // lat: Sequelize.DECIMAL(9, 6),
  // lon: Sequelize.DECIMAL(9, 6),
  description: Sequelize.TEXT,
  price: Sequelize.INTEGER
});

const Photo = db.define('photo', {
  // title: Sequelize.STRING,
  url: Sequelize.STRING
});

// User.hasMany(Listing);
// Listing.hasMany(Photo);

Listing.User = Listing.belongsTo(User);
Photo.Listing = Photo.belongsTo(Listing);

// sequelize.sync({ force: true });
db.sync();

Listing.findListingsByZip = (queryStr, callback) => {
  queryStr.include = [{ model: Photo }];
  Listing.findAll(queryStr)
    .then(data => callback(null, data))
    .catch(err => callback(err, null));
};

Listing.findListingsByID = (id, callback) => {
  const queryStr = { where: { id }, includes: [{ model: Photo }] };
  Listing.findAll(queryStr)
    .then(data => callback(null, data))
    .catch(err => callback(err, null));
};

Photo.createListing2 = (listing, callback) => {
  Photo.create(listing,{include:{association:Photo.Listing}}) 
};

// Photo.createListing2({
//   url: 'www.yomama.com',
//   listing: {
//     title: 'test',
//     address: 'test',
//     address2: "TESTY",
//     city: "TESTY",
//     stateAbbr: "TESTY",
//     zipCode: "TESTY",
//     // lat: "TESTY",
//     // lon: "TESTY",
//     description: "TESTY",
//     price: 444
//   }
// });

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
    .then(data => bCrypt.compare(password, data.password, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result ? data.id : false);
      }
    } ))
    .catch(err => callback(err, null));
};


module.exports.sequelize = db;
module.exports.Listing = Listing;
module.exports.User = User;
module.exports.FBUser = FBUser;
