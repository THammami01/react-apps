const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

router.get("/", async (req, res) => {
  const employees = await Employee.find();
  res.send({ employees });
});

module.exports = router;
