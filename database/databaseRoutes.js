const bCrypt = require("bcrypt");

const { db, Listing, User, Photo } = require("./index");

/* ****************** ******************
LISTING - create listing - need to include username
****************** ****************** */
const createListing = async listing => {
  const existingUser = await User.findOne({
    where: { id: listing.userId }
  });
  const listingInstance = await Listing.create(listing, { include: [Photo] });
  return existingUser.addListing(listingInstance);
};

// createListing({
//   username: 'test1234',
//   title: 'test',
//   address: 'test',
//   address2: 'test',
//   city: 'test',
//   stateAbbr: 'test',
//   zipCode: 'test',
//   photos: [
//     { url: 'www.test.com/pic1' },
//     { url: 'www.test.com/pic2' },
//     { url: 'www.test.com/pic3' },
//     { url: 'www.test.com/pic4' },
//   ],
// });

/* ****************** ******************
LISTING - find listings by zip
****************** ****************** */
const findListingsByZip = async (queryStr, callback) => {
  queryStr.include = [{ model: Photo }, { model: User }];
  try {
    const listings = await Listing.findAll(queryStr);
    callback(null, listings);
  } catch (err) {
    callback(err, null);
  }
};

// // Make sure the sample data is loaded to db before testing.
// // The queryStr logic is copied from server route.
// const zip = `${'70826'.substr(0, 3)}__`;
// const queryStr = zip ? { where: { zipCode: { $like: zip } } } : {};
// findListingsByZip(queryStr, (err, data) => {
//   console.log('**********');
//   console.log('**********');
//   console.log('FIND_BY_ZIP ', err || data);
//   console.log('**********');
//   console.log('**********');
// });

/* ****************** ******************
LISTING - find listings by creator ID. 
          return the same format as findListingsByZip().
****************** ****************** */
const findListingsByID = async (id, callback) => {
  try {
    const listings = await Listing.findAll({
      where: { userId: id },
      include: [{ model: Photo }, { model: User }]
    });
    callback(null, listings);
  } catch(err) {
    callback(err, null);
  }
};

// const userId = 1
// findListingsByID(userId, (err, listings) => {
//   console.log('*********');
//   console.log('*********');
//   console.log(err || listings);
//   console.log('*********');
//   console.log('*********');
// });

/* ****************** ******************
LISTING - edit listing
****************** ****************** */
// to do

/* ****************** ******************
LISTING - delete listing
****************** ****************** */
//  to do

/* ****************** ******************
USER - create user
****************** ****************** */
const createUser = async (newUser, callback) => {
  const existingUser = await User.findAll({
    where: { username: newUser.username }
  });
  if (!existingUser.length) {
    return bCrypt.genSalt(14, (err, salt) => {
      bCrypt.hash(newUser.password, salt, null, (err, hash) => {
        newUser.password = hash;
        User.create(newUser)
          .then(data => callback(null, data))
          .catch(e => callback(e, null));
      });
    });
  }
  return callback("Username taken!", null);
};

// const userTest = {
//   firstname: 'test123',
//   lastname: 'test123',
//   username: 'test1234',
//   password: 'test123',
//   about: 'about123',
//   email: 'test123',
//   zipCode: 'test123',
//   gender: false,
//   age: 22,
// };
// createUser(userTest, (data, data2) => {
//   console.log('***********');
//   console.log('***********');
//   console.log('***********');
//   console.log('***********');
//   console.log('test return:', data, data2);
// });

/* ****************** ******************
USER - authenticate user, returns user ID or false
****************** ****************** */
const validateLogin = async (username, password) => {
  try {
    const user = await User.findOne({ where: { username } });
    const isValidated = await bCrypt.compare(password, user.password);
    return isValidated ? user : null;
  } catch(err) {
    throw err;
  }
};

// validateLogin('test1234', 'test123')
//   .then((isValidated) => console.log('*****validateLogin()*****', isValidated));

module.exports = {
  db,
  createListing,
  findListingsByZip,
  findListingsByID,
  createUser,
  validateLogin
};
