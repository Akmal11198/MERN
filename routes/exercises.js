const express = require("express");
const Exercise = require("../models/exercise");
const route = express.Router();

route.get("/", (req, res) => {
  Exercise.find().then((exercises) => {
    res.json(exercises);
  });
});

route.get("/:id", (req, res) => {
  Exercise.findById(req.params.id).then((exercise) => {
    res.json(exercise);
  });
});

route.delete("/:id", (req, res) => {
  Exercise.findByIdAndDelete(req.params.id).then(() => {
    res.json("deleted");
  });
});

route.post("/update/:id", (req, res) => {
  Exercise.findById(req.params.id).then((exercise) => {
    exercise.username = req.body.username;
    exercise.description = req.body.description;
    exercise.duration = Number(req.body.duration);
    exercise.date = Date.parse(req.body.date);
    exercise.save().then(() => {
      res.json("exercise updated!");
    });
  });
});

route.post("/add", (req, res) => {
  const newEx = new Exercise({
    username: req.body.username,
    description: req.body.description,
    duration: Number(req.body.duration),
    date: Date.parse(req.body.date),
  });
  newEx.save().then(() => {
    res.json("Exercise Added Successfully!");
  });
});

module.exports = route;
