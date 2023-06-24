import { Router } from "express";
import { getAllFabrics, createFabric } from "./../controllers/fabrics.js";

const router = Router();

router.get("/", getAllFabrics);
router.post("/add", createFabric);

export default router;
