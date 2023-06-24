import { sequelize } from "./connection.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3001;

const main = async () => {
  try {
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
