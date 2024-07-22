import "dotenv/config";

import express from "express";
import mongoose from "mongoose";

import User from "./models/user.js";

const app = express();
const PORT = 4000;

// middleware to parse the body of the request
app.use(express.json());

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("connected to the server");
  } catch (error) {
    console.log(error);
  }
};
// route defination
// route for getting all users

app.get("/user", async (req, res) => {
  try {
    const allUser = await User.find();
    res.send(allUser);
  } catch (error) {
    console.log(error);
    res.send("an error occured");
  }
});

// Registration of user.
app.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    address,
    phoneNumber,
    birthDate,
  } = req.body;
  try {
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      address: address,
      phoneNumber: phoneNumber,
      birthDate: birthDate,
    });
    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.send("an error occured");
  }
});

//  Editing a contact
app.put("/update-user/:userId", async (req, res) => {
  const { userId } = req.params;
  const { lastName } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { lastName: lastName },
      { new: true }
    );
    res.send(updatedUser);
  } catch (error) {
    res.send("error occurred");
  }
});

// Delete a contact
app.delete("/delete-user/:userId", async (req, res) => {
  const { userId } = req.params;
  res.send("user deleted");
  try {
    const deleteUser = await user.findByIdAndDelete(userId);
    res.send(deleteUser);
  } catch (error) {
    res.send("error occurred");
  }
});

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server is runing on port ${PORT}`);
});
