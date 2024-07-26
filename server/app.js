const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/notes", noteRoutes);

module.exports = app;