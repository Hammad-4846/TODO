import jwt from "jsonwebtoken";
const User = require("../model/userModel");
const { error } = require("../Utils/responseWrapper");
import { NextFunction, Response, Request } from "express";

exports.isAutheticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: String = req.cookies.todo_token;

    console.log("This is Token", token);
    if (!token) {
      return res.send(error(404, "You Need To Login To access This Resource"));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);
    next();
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
