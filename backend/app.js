import express from "express";
import cors from "cors";
import dictionaryRoutes from "./routes/dictionaryRoutes.js";
import { dictionaryRouteFilters } from "./controllers/dictionaryController.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import {
  errorResponder,
  invalidPathHandler,
} from "./middleware/errorMiddleware.js";

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
for (const filter of dictionaryRouteFilters) {
  app.use(filter, dictionaryRoutes);
}
app.use("/users", userRoutes);
app.use(authRoutes);

app.use(errorResponder);
app.use(invalidPathHandler);

export default app;
