import { NextFunction, Response, Request } from "express";

import { CustomerError } from "../errors/custome-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomerError) {
    console.log("statusCode", err.statusCode);
    console.log("handling this error as a request validation error");
    return res
      .status(err.statusCode)
      .send({ errors: err.serializeErrors()[0] });
  }
  console.log("errrrrrrrr", err);
  res.status(400).send({
    errors: { message: "Something went wrong" },
  });
};
