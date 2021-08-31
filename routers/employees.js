const express = require("express");
const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("./authMiddleware");

const router = express.Router();

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET);
};

router.get("/verify-token", auth, async (req, res) => {
  const { id } = req.user;
  const employees = await Employee.find().where("id").equals(id);
  if (employees.length === 1)
    res.send({
      employee: employees[0],
    });
  else res.send({ status: "Not Found" });
});

router.post("/auth", async (req, res) => {
  const { id, password } = req.body;

  const employees = await Employee.find({
    $and: [{ id }, { password }],
  });

  if (employees.length === 1)
    res.send({
      employee: employees[0],
      accessToken: generateAccessToken(employees[0].id),
    });
  else res.send({ status: "Not Found" });
});

router.get("/", async (req, res) => {
  const employees = await Employee.find();
  res.send({ employees });
});

module.exports = router;
