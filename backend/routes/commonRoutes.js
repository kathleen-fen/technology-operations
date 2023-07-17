import { Router } from "express";
import {
  getAll,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/commonCrud.js";
import { isAuth } from "../middleware/is_auth.js";

const router = Router();

router.get("/", isAuth, getAll);
router.post("/add", isAuth, createItem);
router.patch("/update/:id", isAuth, updateItem);
router.delete("/delete/:id", isAuth, deleteItem);

export default router;
