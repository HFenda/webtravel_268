const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => res.render("pages/index"));

router.get("/login", (req, res) => res.render("pages/login"));

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

router.get("/register", (req, res) => res.render("pages/register"));

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  res.redirect("/login");
});

module.exports = router;
