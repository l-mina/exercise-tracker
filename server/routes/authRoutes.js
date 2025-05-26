import express from "express";
import { registerUser, loginUser, refreshAccess, logout, verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/refresh', refreshAccess);

router.get('/check-auth', verifyToken);

router.post('/logout', logout);

export default router;