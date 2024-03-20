import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "todoUser",
    required: true,
  },
});

module.exports = mongoose.model("Todo", userSchema);
