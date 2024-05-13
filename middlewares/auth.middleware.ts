import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import StudentModel, { IStudent } from "../models/student.model";

interface AuthenticatedRequest extends Request {
  user?: IStudent;
}
const protectRoute = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");

    const user = await StudentModel.findById(decoded.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default protectRoute;
