const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    const user = new UserModel({ username, email, password: hashedPassword });
    await user.save();
    res
      .status(200)
      .send({ msg: "A new user has been registered", newUser: user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      if (result) {
        const token = jwt.sign(
          { username: user.username, userID: user._id },
          "masai",
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).send({ msg: "Login successful!", token: token });
      } else {
        return res.status(401).send({ msg: "Wrong credentials" });
      }
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = {
  userRouter,
};
