const path = require("path");
const express = require("express");
const cors = require("cors");
const employeesRouter = require("./routers/employees");
const leavesRouter = require("./routers/leaves");
require("dotenv").config();
require("./db"); // Globally shared database

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api/employees", employeesRouter);
app.use("/api/leaves", leavesRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"), (err) => {
    if (err) res.status(500).send(err);
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
