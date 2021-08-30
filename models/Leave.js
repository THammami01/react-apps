const mongoose = require("mongoose");

const schema = mongoose.Schema({
  employeeId: String,
  lastname: String,
  firstname: String,
  level: String,
  departureDate: String,
  returnDate: String,
  status: String,
});

module.exports = mongoose.model("Leave", schema);
