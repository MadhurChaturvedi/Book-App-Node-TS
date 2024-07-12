import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  // valdation!
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fileds are required");
    return next(error);
  }

  const user = await userModel.findOne({ email });
  if (user) {
    const error = createHttpError(400, "User already exist wiht this email.");
    return next(error);
  }
  res.json({ message: "User Created!" });
};

export { createUser };
