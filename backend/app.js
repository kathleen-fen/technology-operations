import express from "express";
import cors from "cors";
import fabricsRoutes from "./routes/fabrics.js";

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use("/fabrics", fabricsRoutes);

export default app;
