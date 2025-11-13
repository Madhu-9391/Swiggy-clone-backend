import express from "express";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// GET /swiggy/auth-check
router.get("/", verifyToken, (req, res) => {
  res.json({ success: true, email: req.user.email, role: req.user.role });
});

export default router;
