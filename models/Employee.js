const mongoose = require("mongoose");

const schema = mongoose.Schema({
  id: String,
  lastname: String,
  firstname: String,
  level: String,
  phoneNb: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("Employee", schema);
