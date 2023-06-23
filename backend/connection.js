import pkg from "pg";
const { Client } = pkg;

export const client = new Client({
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "postgres",
});
