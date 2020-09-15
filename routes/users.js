const express = require("express");
const User = require("../models/user");
const route = express.Router();

route.get("/", (req, res) => {
  User.find().then((users) => {
    res.json(users);
  });
});

route.post("/add", (req, res) => {
  const newUser = new User({ username: req.body.username });
  newUser.save().then(() => {
    res.json("User Added Successfully!");
  });
});

module.exports = route;
