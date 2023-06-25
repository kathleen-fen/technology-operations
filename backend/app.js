import express from "express";
import cors from "cors";
import commonRoutes from "./routes/commonRoutes.js";
import { commonRouteFilters } from "./controllers/commonCrud.js";

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
for (const filter of commonRouteFilters) {
  app.use(filter, commonRoutes);
}

export default app;