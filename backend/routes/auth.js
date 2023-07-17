import { Router } from "express";
import { login, refreshToken } from "../controllers/auth.js";

const router = Router();

router.post("/login", login);
router.post("/refreshToken", refreshToken);

/* router.get("/", getAll);
router.post("/add", createItem);
router.patch("/update/:id", updateItem);
router.delete("/delete/:id", deleteItem); */

export default router;
