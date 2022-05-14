const { getUserByEmail, getUserById } = require("../model/user.model");
const {
  createUserSessions,
  getUserSessions,
  deleteUserSessions,
} = require("../model/user_sessions.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const jwtSecret = "R1O8}_z!hE^TvcL";

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const userData = await getUserByEmail(email);

  if (!email && !password)
    return res
      .status(400)
      .send({ error: "Email address & Password is required" });

  if (!userData) return res.status(404).send({ error: "Account not found!" });

  const checkPassword = bcrypt.compareSync(password, userData.password);

  if (!checkPassword)
    return res.status(400).send({ error: "Password Account not match!" });

  const generateJwt = createJWToken(userData.id);

  const result = await createUserSessions({
    user_id: userData.id,
    hashed_tokens: crypto
      .createHash("md5")
      .update(generateJwt.rawToken.token)
      .digest("hex"),
    selector: generateJwt.rawToken.selector,
    created_on: Math.floor(new Date().getTime() / 1000),
  });

  if (result != true) return res.status(500).send(result);

  return res.status(200).send({ authToken: generateJwt.jwtToken });
};

exports.logout = async (req, res) => {
  const { userId, sessionsId } = req;

  const result = await deleteUserSessions(sessionsId);

  return res.status(200).send({ success: "Logout success" });
};

exports.checkAuthentication = async (req, res, next) => {
  const authToken = req.headers.authtoken;
  if (!authToken)
    return res.status(400).send({ error: "authToken is required!" });

  let result = {};
  try {
    result = jwt.verify(authToken, jwtSecret);
  } catch (e) {
    return res.status(500).send();
  }

  if (!result) return res.sendStatus(401);

  const sessionData = await getUserSessions(
    crypto.createHash("md5").update(result.rawToken.token).digest("hex"),
    result.rawToken.selector
  );

  if (!sessionData) return res.sendStatus(401);

  req.userId = sessionData.user_id;
  req.sessionsId = sessionData.id;

  next();
};

exports.checkUserType = (type) => {
  return async function (req, res, next) {
    const { userId } = req;
    const userData = await getUserById(userId);

    if (userData?.type != type) return res.sendStatus(403);

    next();
  };
};

createJWToken = (userId) => {
  const rawToken = {
    selector: crypto.randomBytes(10).toString("hex"),
    token: crypto.randomBytes(25).toString("hex"),
    userId: userId,
  };
  const result = {
    rawToken: rawToken,
    jwtToken: jwt.sign({ rawToken }, jwtSecret),
  };

  return result;
};
