const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Authentication & User API",
      version: "0.0.1",
      description: "Details on the API for authentication and user operations",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./apps/routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "*",
    methods: "*",
  })
);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./apps/routes/user.routes")(app, express);
// require("./apps/routes/api-docs.routes")(app, express);

const server = app.listen(PORT);
console.log(`Server started at port ${PORT}`);
module.exports = { app, server };
