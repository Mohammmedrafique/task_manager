const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
