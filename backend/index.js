import { sequelize } from "./connection.js";
import app from "./app.js";
import dotenv from "dotenv";
import { erHandler } from "./utilities/errors/ErrorHandler.js";

dotenv.config();

const port = process.env.PORT || 3001;

const main = async () => {
  try {
    //handle uncaught exeptions
    process.on("uncaughtException", (error) => {
      erHandler.handleError(error);
      if (!erHandler.isTrustedError(error)) {
        process.exit(1);
      }
    });
    // get the unhandled rejection and throw it to another fallback handler we already have.
    process.on("unhandledRejection", (reason, promise) => {
      throw reason;
    });
    await sequelize.authenticate();

    console.log("Connection has been established successfully.");
    app.get("/", function (req, res) {
      res.send("Hello World");
    });
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
main();
