const Sequelize = require('sequelize');
const { host, dialect, dbName, user, password } = require('./db.config.js');
// console.log(host);

if (process.env.CLEARDB_DATABASE_URL) {
  const db = new Sequelize(process.env.CLEARDB_DATABASE_URL);
  module.exports = db;
} else {
  const db = new Sequelize(dbName, user, password, {
    host: host,
    dialect: dialect,
    // pool: {
    //   max: 5,
    //   min: 1,
    //   acquire: 30000,
    //   idle: 1
    // }
  });
  module.exports = db;
}
