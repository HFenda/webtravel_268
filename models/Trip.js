const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  questions: [
    { body: String, user: String, date: { type: Date, default: Date.now } },
  ],
});

module.exports = mongoose.model("Trip", tripSchema);
