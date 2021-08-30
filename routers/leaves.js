const express = require("express");
const Leave = require("../models/Leave");

const router = express.Router();

router.get("/", async (req, res) => {
  const leaves = await Leave.find();
  res.send({ leaves });
});

router.get("/:employeeId", async (req, res) => {
  const { employeeId } = req.params;

  const leaves = await Leave.find().where("employeeId").equals(employeeId);
  res.send({ leaves });
});

module.exports = router;
