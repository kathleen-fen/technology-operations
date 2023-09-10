import { logger } from "../logger/Logger.js";
import { BaseError } from "./BaseError.js";

class ErrorHandler {
  async handleError(err) {
    logger.error(
      "Error message from the centralized error-handling component",
      err
    );
    // await sendMailToAdminIfCritical();
    // await sendEventsToSentry();
  }

  isTrustedError(error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}
export const erHandler = new ErrorHandler();
