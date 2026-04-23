import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/google", googleAuth);
router.get("/logout", logoutUser);

export default router;  

