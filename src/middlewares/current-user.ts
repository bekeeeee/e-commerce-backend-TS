import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { NotAuthenticated } from "../errors/not-authenticated-error";

interface UserPayload {
  _id: ObjectId;
  email: string;
  username: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser: UserPayload;
    }
  }
}

export const currentUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("here currentuser middleware");
  if (!req.session?.jwt) {
    // console.log("null currentuser");
    throw new NotAuthenticated();

    // return res.send(null);
  }
  try {
    // console.log("try verifing");
    const payload = jwt.verify(
      req.session?.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;

    req.currentUser = payload;
    // res.send(payload);
  } catch (err) {
    // return res.send({currentUser:null})
    next();
  }

  next();
};
