import { BaseError } from "./BaseError.js";
import HttpStatusCode from "./httpStatusCode.js";
export class APIError extends BaseError {
  constructor(
    name,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true,
    description = "internal server error"
  ) {
    super(name, httpCode, isOperational, description);
  }
}
