const express = require("express");
require("../db/database.js");
const cors = require("cors");
const initRoutes = require("../routes.js");
const serverless = require("serverless-http");

const app = express();

global.__basedir = __dirname;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: "http://localhost:3000",
// };
// app.use(cors(corsOptions));

const router = initRoutes(app);

app.use("/.netlify/functions/api", router);
module.exports.handler = serverless(app);
module.exports = app;
