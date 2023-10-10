import dotenv from "dotenv";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const cls = require("cls-hooked");
const namespace = cls.createNamespace("sequences-namespace");
const Sequelize = require("sequelize");
Sequelize.useCLS(namespace);

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "postgres",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "postgres",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
    },
    logging: false,
  }
);

export { sequelize };
