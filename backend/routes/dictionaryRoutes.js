import { Router } from "express";
import {
  getAll,
  createItem,
  updateItem,
  deleteItem,
  getByParent,
  markItemsAsDeleted,
} from "../controllers/dictionaryController.js";
import { isAuth } from "../middleware/is_auth.js";

const router = Router();

router.get("/", getAll);
router.post("/add", isAuth, createItem);
router.patch("/update/:id", isAuth, updateItem);
router.delete("/delete/:id", isAuth, deleteItem);
router.get("/:parent", getByParent);
router.patch("/mark_as_deleted/:id", markItemsAsDeleted);

export default router;
