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

router.put("/", async (req, res) => {
  const { _id } = req.body;
  delete req.body.id;

  await Leave.findByIdAndUpdate(_id, req.body, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else res.send({ status: "Updated" });
  });
});

router.put("/delete", async (req, res) => {
  const { _id } = req.body;
  console.log(req.body);

  await Leave.findByIdAndRemove(_id, {}, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else res.send({ status: "Deleted" });
  });
});

module.exports = router;
