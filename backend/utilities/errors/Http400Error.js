import { BaseError } from "./BaseError.js";
import HttpStatusCode from "./httpStatusCode.js";

export class HTTP400Error extends BaseError {
  constructor(description = "bad request") {
    super("NOT FOUND", HttpStatusCode.BAD_REQUEST, true, description);
  }
}
