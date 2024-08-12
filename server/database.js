const sqlite3 = require('sqlite3').verbose();

//connect to database
const db = new sqlite3.Database('./mainDatabase.sqlite')

db.run('CREATE TABLE games (id INT)')

module.exports = db