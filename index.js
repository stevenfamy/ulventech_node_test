const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "*",
    methods: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./apps/routes/user.routes")(app, express);

const server = app.listen(PORT);
console.log(`Server started at port ${PORT}`);
module.exports = { app, server };
