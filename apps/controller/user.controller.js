const { createNewUserModel, getUserByEmail } = require("../model/user.model");

exports.createNewUser = async (req, res) => {
  const { email, password, type } = req.body;
  if (!email || !password || !type)
    return res
      .status(400)
      .send({ error: "Email, Password and Type is required!" });

  if (parseInt(type) != 1 && parseInt(type) != 2)
    return res.status(400).send({ error: "Wrong parameter for type!" });

  const exist = await getUserByEmail(email);
  if (exist) return res.status(400).send({ error: "Email already exist!" });

  const result = await createNewUserModel({ email, password, type });

  console.log("res", result);
  if (!result) return res.status(400).send({ error: result });

  return res.status(200).send({ result: "User successfully created!" });
};
