import express from "express";
import { authUser, registerUser } from "../controllers/user.js";

const router = express.Router();
router.post("/login", authUser);
router.post("/register", registerUser);
// router.get("/register", getUsers);
export default router;
