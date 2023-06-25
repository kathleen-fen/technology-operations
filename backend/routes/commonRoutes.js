import { Router } from "express";
import {
  getAll,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/commonCrud.js";

const router = Router();

router.get("/", getAll);
router.post("/add", createItem);
router.patch("/update/:id", updateItem);
router.delete("/delete/:id", deleteItem);

export default router;
