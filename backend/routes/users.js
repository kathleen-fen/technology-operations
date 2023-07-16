import { Router } from "express";
import { createUser } from "../controllers/users.js";

const router = Router();

router.post("/add", createUser);

/* router.get("/", getAll);
router.post("/add", createItem);
router.patch("/update/:id", updateItem);
router.delete("/delete/:id", deleteItem); */

export default router;
