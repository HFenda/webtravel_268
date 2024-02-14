const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");

router.get("/", async (req, res) => {
  const trips = await Trip.find({});
  res.render("pages/trips", { trips, user: req.session.user });
});

router.post("/:tripId/question", async (req, res) => {
  const { question } = req.body;
  await Trip.findByIdAndUpdate(req.params.tripId, {
    $push: { questions: { body: question, user: req.session.user.username } },
  });
  res.redirect("/trips/" + req.params.tripId);
});

router.get("/", async (req, res) => {
  let query = {};
  if (req.query.category) {
    query.category = req.query.category;
  }
  const trips = await Trip.find(query);
  res.render("pages/trips", { trips, user: req.session.user });
});

module.exports = router;
