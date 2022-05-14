const db = require("../config/db.config");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

exports.getUserByEmail = async (email) => {
  let res = {};
  try {
    res = await db.get(`SELECT * FROM user where email='${email}'`);
  } catch (e) {
    res = e;
  }
  return res;
};

exports.getUserById = async (userId) => {
  let res = {};
  try {
    res = await db.get(`SELECT * FROM user where id='${userId}'`);
  } catch (e) {
    res = e;
  }
  return res;
};

exports.createNewUserModel = async (userData) => {
  const hashedNewPwd = bcrypt.hashSync(userData.password, 8);
  let sql = `INSERT INTO user (id, email, password, type) 
    VALUES ('${uuidv4()}','${userData.email}', '${hashedNewPwd}', ${parseInt(
    userData.type
  )})`;

  let res = true;
  try {
    await db.run(sql);
  } catch (e) {
    res = e;
  }

  return res;
};
