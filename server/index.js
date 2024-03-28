const express = require("express");
const app = express();
const cors = require('cors');
const connection = require("./db");
app.use(cors({ origin: 'http://localhost:3000' }));
const { userRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/note.routes");

require("dotenv").config();
app.use(express.json());

app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
    console.log(`Server is running at ${process.env.PORT}`);
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
});
