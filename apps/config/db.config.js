const sqlite3 = require("sqlite3").verbose();
const util = require("util");
const dbFile = "db/data.db";

let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
  if (err) throw err;
});

db.run = util.promisify(db.run);
db.get = util.promisify(db.get);
db.all = util.promisify(db.all);

module.exports = db;
