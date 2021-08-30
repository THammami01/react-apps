const express = require("express");
const cors = require("cors");
require("dotenv").config();
const employeesRouter = require("./routers/employees");
const leavesRouter = require("./routers/leaves");
require("./db"); // Globally shared database

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/employees", employeesRouter);
app.use("/api/leaves", leavesRouter);

const port = 4000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
