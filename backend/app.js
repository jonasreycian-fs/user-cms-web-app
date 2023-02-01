// Entry point for the backend server of the application
// which uses data.json as the database and cors to
// allow cross-origin requests

const express = require("express");
const bodyParser = require("body-parser");
const { faker } = require("@faker-js/faker");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 3000;
const filePath = "./db/data.json";

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "Hello World!",
    id: faker.random.alphaNumeric(6).toLocaleUpperCase(),
  });
});

module.exports = {
  app: app,
  port: port,
};
