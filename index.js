import express, { json } from 'express';
const app = express()
const port = 3000;
app.use(express.json());
const { Schema } = mongoose;

import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://malikabbasov:malikabbasov@cluster0.2fsq8qp.mongodb.net/")
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err.message));

const userSchema = new Schema({
  Username: String,
  Email: String,
  Password: { type: String, required: true },
  Age: Number,
  isMarried: Boolean,
});

const userModel = mongoose.model("myusers", userSchema);

app.get("/", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.send("");
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const users = await userModel.findById(id);
  res.send(users);
});

app.post("/", async (req, res) => {
  try {
    const { Username, Email, Password, Age, isMarried } = req.body;
    const newUser = new userModel({
      Username,
      Email,
      Password,
      Age,
      isMarried,
    });
    await newUser.save();
    res.status(200).send("successfull");
  } catch (error) {
    res.send("not added");
  }
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const users = await userModel.findByIdAndUpdate(id);
  res.send(users);
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const users = await userModel.findByIdAndDelete(id);
  res.send(users);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
