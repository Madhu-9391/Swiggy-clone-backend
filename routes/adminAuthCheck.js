import express from "express";
import { verifyToken, verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();

// GET /swiggy/admin/auth-check
router.get("/", verifyToken, verifyAdmin, (req, res) => {
  res.json({ success: true, email: req.user.email, role: req.user.role });
});

export default router;
