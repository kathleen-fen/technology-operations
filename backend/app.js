import express from "express";
import cors from "cors";
import commonRoutes from "./routes/commonRoutes.js";
import { commonRouteFilters } from "./controllers/commonCrud.js";
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
for (const filter of commonRouteFilters) {
  app.use(filter, commonRoutes);
}
app.use("/users", userRoutes);
app.use(authRoutes);

app.use(errorResponder);
app.use(invalidPathHandler);

export default app;
