const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/pursuitblog');

module.exports = db;