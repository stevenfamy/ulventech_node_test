module.exports = (app) => {
  const authCont = require("../controller/auth.controller");
  let router = require("express").Router();

  /**
   * @swagger
   * components:
   *  schemas:
   *    User_sessions:
   *      type: object
   *      required:
   *        - id
   *        - user_id
   *        - hashed_tokens
   *        - selector
   *        - created_on
   *      properties:
   *        id:
   *          type: string
   *          description: Auto generated session id using uuidv4 standard
   *        user_id:
   *          type: string
   *          description: User id FK to user table
   *        hashed_tokens:
   *          type: string
   *          description: secret token inside generated inside jwt and hashed
   *        selector:
   *          type: integer
   *          description: session selector token for query
   *        created_on:
   *          type: integer
   *          description: when the session is created on unix epoch timestamp
   *      example:
   *        email: steve.mailme@gmail.com
   *        password: "123123123"
   *        type: 1
   *
   */

  /**
   * @swagger
   * tags:
   *  name: Authentication
   *  description: Authentication API
   *
   */

  /**
   * @swagger
   * /login:
   *  post:
   *    summary: Login with existing user account
   *    tags: [Authentication]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *            schema:
   *                type: object
   *                properties:
   *                    email:
   *                        type: string
   *                    password:
   *                        type: string
   *                required:
   *                    - email
   *                    - password
   *                example:
   *                    email: steve.mailme@gmail.com
   *                    password: "123123123"
   *    responses:
   *      200:
   *        description: Login success
   *      400:
   *        description: Wrong password
   *      404:
   *        description: Account not found
   *      500:
   *        description: Server Error
   *
   */
  router.post("/login", authCont.login);

  /**
   * @swagger
   * /logout:
   *  post:
   *    summary: Logout from current sessions
   *    tags: [Authentication]
   *    parameters:
   *     - in: header
   *       name: authToken
   *       schema:
   *        type: string
   *        format: jwt
   *       required: true
   *    responses:
   *      200:
   *        description: Logout success
   *      400:
   *        description: JWT Missing
   *      401:
   *        description: Unauthorized
   *      500:
   *        description: Server Error
   *
   */
  router.post("/logout", authCont.checkAuthentication, authCont.logout);

  app.use("/", router);
};
