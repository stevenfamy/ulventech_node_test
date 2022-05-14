const db = require("../config/db.config");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

exports.getUserSessions = async (hashedTokens, selector) => {
  let res = {};
  try {
    res = await db.get(
      `SELECT * FROM user_sessions where hashed_tokens='${hashedTokens}' and selector='${selector}'`
    );
  } catch (e) {
    res = e;
  }
  return res;
};

exports.deleteUserSessions = async (sessionsId) => {
  let sql = `DELETE FROM user_sessions where id = '${sessionsId}';`;

  let res = true;
  try {
    await db.run(sql);
  } catch (e) {
    res = e;
  }

  return res;
};

exports.createUserSessions = async (payload) => {
  let sql = `INSERT INTO user_sessions (id, user_id, hashed_tokens, selector, created_on) 
    VALUES ('${uuidv4()}', '${payload.user_id}', '${payload.hashed_tokens}', '${
    payload.selector
  }', ${parseInt(payload.created_on)});`;

  let res = true;
  try {
    await db.run(sql);
  } catch (e) {
    res = e;
  }

  return res;
};
