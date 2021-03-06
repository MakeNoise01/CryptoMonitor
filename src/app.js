
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const config = require('./configs/config.js')
// const { Classes, User } = require("./db.js")
const server = express();
const routes = require("./routes/index.js");

server.name = "API";

server.set('key', config.key)
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(morgan("dev")); // to console.log routes in node console
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3005"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

server.use("/", routes);


// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;