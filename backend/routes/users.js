import { Router } from "express";
import { createUser } from "../controllers/users.js";
import { isAuth } from "../middleware/is_auth.js";

const router = Router();

router.post("/add", isAuth, createUser);

/* router.get("/", getAll);
router.post("/add", createItem);
router.patch("/update/:id", updateItem);
router.delete("/delete/:id", deleteItem); */

export default router;
