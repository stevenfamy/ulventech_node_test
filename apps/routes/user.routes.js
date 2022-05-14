module.exports = (app) => {
  const userCont = require("../controller/user.controller");
  let router = require("express").Router();

  // routes for login authentication
  router.post("/create-user", userCont.createNewUser);

  app.use("/", router);
};
