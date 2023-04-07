const express = require("express");
const router = express.Router();
const auth = require("./controller/auth.controller.js");
const file = require("./controller/file.controller.js");
const authenticate = require("./lib/authenticate.js");
const property = require("./controller/property.controller.js");
const booking = require("./controller/booking.controller.js");

let routes = (app) => {
  //authentication
  router.post("/users/authenticate", auth.login);
  router.post("/users/register", auth.register);

  router.get("/properties", authenticate, property.getAll);
  router.post("/properties", authenticate, property.create);
  // router.get("/properties/:id", authenticate, property.getById);
  router.get("/properties/:id", property.getById);
  router.put("/properties/:id", authenticate, property.updateById);
  router.delete("/properties/:id", authenticate, property.deleteById);

  router.get("/bookings", authenticate, booking.getAll);
  router.post("/bookings", booking.create); // allow for checkout
  // router.get("/bookings/:id", authenticate, bookings.getById);
  router.get("/bookings/:id", booking.getById);
  router.put("/bookings/:id", authenticate, booking.updateById);
  router.delete("/bookings/:id", authenticate, booking.deleteById);

  //file upload
  router.post("/upload", file.upload);
  router.get("/files", file.getListFiles);
  router.get("/files/:name", file.download);

  app.use(router);
};

module.exports = routes;
