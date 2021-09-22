import { CustomerError } from "./custome-error";

export class NotFoundError extends CustomerError {
  statusCode = 404;
  reason = "Route not found";
  constructor() {
    super("Route not found");
    Object.setPrototypeOf(this, NotFoundError.prototype);
    // Error.captureStackTrace(this, this.constructor);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
