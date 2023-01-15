const express = require("express");
const { UserModel } = require("../models/Users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config()

const userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.secret_key);
          console.log("Login Successful");
          res.send({ msg: "Login Successful", token });
        } else {
          res.send("Wrong Credentials");
          console.log("Wrong Credentials");
        }
      });
    } else {
      res.send("Wrong Credentials");
      console.log("Wrong Credentials");
    }
  } catch (err) {
    res.send(err);
    console.log("Wrong Credentials");
  }
});

userRouter.post("/register", async (req, res) => {
  const { name, email, pass, age } = req.body;
  try {
    bcrypt.hash(pass, 7, async (err, secure_pass) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        const User = new UserModel({ name, email, pass: secure_pass, age });
        await User.save();
        res.send("Register Successful");
      }
    });
  } catch (err) {
    res.send(err);
    console.log(err, "Err Something went Wrong");
  }
});

module.exports = {
  userRouter,
};
