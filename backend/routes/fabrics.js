import { Router } from "express";
import {
  getAllFabrics,
  createFabric,
  updateFabric,
  deleteFabric,
} from "./../controllers/fabrics.js";

const router = Router();

router.get("/", getAllFabrics);
router.post("/add", createFabric);
router.patch("/update/:id", updateFabric);
router.delete("/delete/:id", deleteFabric);

export default router;
