import mongoose, { Mongoose } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextFunction } from "express";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [30, "Name Cannot Exceed 30 Characters"],
    minLength: [4, "Name Should Have Atleast 4 Characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password Should be greater than 8character"],
    select: false,
  },
  todos: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Todo",
    },
  ],
});

userSchema.pre("save", async function (next: NextFunction) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//JWT TOKEN
userSchema.methods.getJWTToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });
};

userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("todoUser", userSchema);
