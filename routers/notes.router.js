const express = require("express");
const { Notemodel } = require("../models/Notes.model");

const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
  try {
    const data = await Notemodel.find();
    res.send(data);
    console.log("All Notes are here", data);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

noteRouter.post("/create", async (req, res) => {
  const note = req.body;
  try {
    const data = new Notemodel(note);
    await data.save();
    res.send("Note Created");
  } catch (err) {
    res.send("Something went wrong", err);
    console.log("Something went wrong", err);
  }
});

noteRouter.patch("/update/:id", async (req, res) => {
  const note = req.body;
  const ID = req.params.id;
  const user_ID = req.body.userID;

  const data = await Notemodel.findOne({ _id: ID });
  const user_change_ID = data.userID;
  try {
    if (user_ID === user_change_ID) {
      await Notemodel.findByIdAndUpdate({ _id: ID }, note);
      res.send("Note Updated")
    }else{
      res.send("You are not Authorised")
      console.log("You are not Authorised")
    }
  } catch (err) {
    res.send("Something went wrong", err)
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  const user_ID = req.body.userID;
  const data = await Notemodel.findOne({ _id: ID });
  try {
    if (user_ID == data.userID) {
      await Notemodel.findByIdAndDelete({ _id: ID });
      res.send("Note Deleted")
    }else{
      res.send("You are not Authorised")
      console.log("You are not Authorised")
    }
  } catch (err) {
    res.send("Something went wrong", err)
  }
});

module.exports = {
  noteRouter,
};
