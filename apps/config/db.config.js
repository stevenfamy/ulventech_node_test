const sqlite3 = require("sqlite3").verbose();
const dbFile = ".../db/playlist.db";

let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
  if (err) throw err;
  console.log("DB Connection Success");
});

module.exports = db;
