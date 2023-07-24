import { erHandler } from "../utilities/errors/ErrorHandler.js";

// Error handling Middleware functions

const errorResponder = async (err, _req, res, next) => {
  if (!erHandler.isTrustedError(err)) {
    next(err);
  }
  await erHandler.handleError(err);
  const status = err.httpCode || 400;
  res.status(status).send(err.description);
};

const invalidPathHandler = (req, res, _next) => {
  res.status(400);
  res.send(`Invalid path, ${req.url} does not exists`);
};

export { errorResponder, invalidPathHandler };
