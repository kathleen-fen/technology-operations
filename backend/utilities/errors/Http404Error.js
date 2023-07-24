import { BaseError } from "./BaseError.js";
import HttpStatusCode from "./httpStatusCode.js";

export class HTTP404Error extends BaseError {
  constructor(description = "not found") {
    super("NOT FOUND", HttpStatusCode.NOT_FOUND, true, description);
  }
}
