const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  {
    versionKey: false,
  }
);
const UserModel = mongoose.model("User", userSchema);
module.exports = {
  UserModel,
};
