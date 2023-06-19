import {
  Liquibase,
  LiquibaseLogLevels,
  POSTGRESQL_DEFAULT_CONFIG,
} from "liquibase";
import express from "express";

const myConfig = {
  ...POSTGRESQL_DEFAULT_CONFIG,
  changeLogFile: "./changelog.xml",
  url: "jdbc:postgresql://localhost:5432/postgres",
  username: "postgres",
  password: "postgres",
  liquibaseSchemaName: "public",
  logLevel: LiquibaseLogLevels.Off,
};
const inst = new Liquibase(myConfig);

//inst.status();
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:3000`);
});
