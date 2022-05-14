module.exports = (app) => {
  const {
    checkAuthentication,
    checkUserType,
  } = require("../controller/auth.controller");
  const { testAPI } = require("../controller/test.controller");
  let router = require("express").Router();

  /**
   * @swagger
   * tags:
   *  name: Test
   *  description: Testing API
   *
   */

  /**
   * @swagger
   * /test/admin:
   *  get:
   *    summary: API only for user with admin rights
   *    tags: [Test]
   *    parameters:
   *     - in: header
   *       name: authToken
   *       schema:
   *        type: string
   *        format: jwt
   *       required: true
   *    responses:
   *      200:
   *        description: Success
   *      401:
   *        description: Unauthorized
   *      403:
   *        description: Forbidden
   *      500:
   *        description: Server Error
   *
   */
  router.get("/admin", checkAuthentication, checkUserType(1), testAPI);

  /**
   * @swagger
   * /test/customer:
   *  get:
   *    summary: API only for user with customer rights
   *    tags: [Test]
   *    parameters:
   *     - in: header
   *       name: authToken
   *       schema:
   *        type: string
   *        format: jwt
   *       required: true
   *    responses:
   *      200:
   *        description: Success
   *      401:
   *        description: Unauthorized
   *      403:
   *        description: Forbidden
   *      500:
   *        description: Server Error
   *
   */
  router.get("/customer", checkAuthentication, checkUserType(2), testAPI);

  app.use("/test", router);
};
