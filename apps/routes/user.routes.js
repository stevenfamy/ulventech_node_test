module.exports = (app) => {
  const userCont = require("../controller/user.controller");
  let router = require("express").Router();

  /**
   * @swagger
   * components:
   *  schemas:
   *    User:
   *      type: object
   *      required:
   *        - email
   *        - password
   *        - type
   *      properties:
   *        id:
   *          type: string
   *          description: Auto generated user id using uuidv4 standard
   *        email:
   *          type: string
   *          description: User email use for login and communication
   *        password:
   *          type: string
   *          description: Password that user choose as a authentication
   *        type:
   *          type: integer
   *          description: type of user to be created (1 is admin, 2 is customer)
   *      example:
   *        email: steve.mailme@gmail.com
   *        password: "123123123"
   *        type: 1
   *
   */

  /**
   * @swagger
   * tags:
   *  name: Users
   *  description: User Managing API
   *
   */

  /**
   * @swagger
   * /create-user:
   *  post:
   *    summary: Create new User Account
   *    tags: [Users]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/User'
   *    responses:
   *      200:
   *        description: Successfully created new user account
   *      400:
   *        description: Failed to create new user account
   *
   */
  router.post("/create-user", userCont.createNewUser);

  app.use("/", router);
};
