const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/users", async (req, res) => {
  const users = await User.find({});
  res.render("admin/users", { users });
});

router.get("/users/edit/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.render("admin/editUser", { user });
});

router.post("/users/edit/:userId", async (req, res) => {
  const { username, role } = req.body;
  await User.findByIdAndUpdate(req.params.userId, { username, role });
  res.redirect("/admin/users");
});

router.post("/users/toggle/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  user.isActive = !user.isActive;
  await user.save();
  res.redirect("/admin/users");
});

router.post("/trips/:tripId/question/:questionId/delete", async (req, res) => {
  const { tripId, questionId } = req.params;
  await Trip.findByIdAndUpdate(tripId, {
    $pull: { questions: { _id: questionId } },
  });
  res.redirect("/admin/trips/" + tripId);
});

module.exports = router;
