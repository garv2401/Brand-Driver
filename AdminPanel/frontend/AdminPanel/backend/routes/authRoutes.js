import express from 'express';
const router=express.Router();
import { login,logout,register,getCurrentUser } from '../controllers/authController.js';
import auth from '../middlewares/auth.js';
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/protected", auth, (req, res) => {
  res.json({ message: "You are authorized", user: req.user });
});
router.get("/me", auth, getCurrentUser);

export default router; 