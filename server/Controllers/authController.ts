const User = require("../model/userModel");
const { error, success } = require("../Utils/responseWrapper");
import { Response, Request } from "express";
import crypto from "crypto";

exports.registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.send(error(401, "Please Enter Valid Details"));
    }

    let candidate = await User.findOne({ email });

    if (candidate) {
      return res.send(error(500, "User Is Already Exist"));
    }

    candidate = await User.create({
      name,
      email,
      password,
    });

    const token = await candidate.getJWTToken();

    const option: { expires: Date; httpOnly: boolean } = {
      expires: new Date(
        Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    const loginToken = getLocalToken();

    console.log(option, token);
    res.cookie("todo_token", token, option);

    res.send(success(200, { candidate, loginToken }));
  } catch (e) {
    res.send(error(500, e.message));
  }
};

exports.loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send(error(401, "Please Enter Valid Email And Password"));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.send(error(401, "Invalid Email And Password"));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.send(error(401, "Invalid Email And Password"));
    }

    const token = await user.getJWTToken();

    const option: { expires: Date; httpOnly: boolean } = {
      expires: new Date(
        Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.cookie("todo_token", token, option);

    const loginToken = getLocalToken();

    res.send(success(200, { user, loginToken }));
  } catch (e) {
    res.send(error(500, e.message));
  }
};



exports.getLoggedOut = (req: Request, res: Response) => {
  try {
    res.clearCookie("todo_token", {
      httpOnly: true,
      secure: true,
    });

    return res.send(success(200, "Logged out successfully"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};


//Get user Detail
exports.getUserDetails = async (req: Request, res: Response) => {
  const user = req.user;
  const loginToken = getLocalToken();
  res.send(success(200, { user, loginToken }));
};

//getLocalToken
const getLocalToken = (): string => {
  const loginToken = crypto.randomBytes(16).toString("hex");
  return loginToken;
};

