const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB Database");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = exports = mongoose;
