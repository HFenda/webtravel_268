const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
