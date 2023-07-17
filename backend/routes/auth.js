import { Router } from "express";
import { login } from "../controllers/auth.js";

const router = Router();

router.post("/login", login);

/* router.get("/", getAll);
router.post("/add", createItem);
router.patch("/update/:id", updateItem);
router.delete("/delete/:id", deleteItem); */

export default router;
