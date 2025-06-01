// routes/userAuthRoutes.js
import express from "express";
import { registerUser, loginUser, logoutUser,verifyEmail } from "../controllers/userAuthController.js";

const router = express.Router();

router.get("/verify-email", verifyEmail);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
