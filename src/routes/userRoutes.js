import express from "express";
import { userController } from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";
import { roleCheck } from "../middleware/roleCheck.js";

const router = express.Router();

router.get("/", auth, roleCheck(["admin"]), userController.getAllUsers);
router.post("/add-user", auth, roleCheck(["admin"]), userController.addUser);
router.delete("/:id", auth, roleCheck(["admin"]), userController.deleteUser);
router.put("/update-password", auth, userController.updatePassword);

export default router;
