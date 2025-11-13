import express from "express";
import jwt from "jsonwebtoken";
import Order from "../models/Order.js";
import { verifyToken} from "../middlewares/auth.js";
const router = express.Router();

// Middleware to verify JWT


// GET /swiggy/myorders - protected route
router.get("/", verifyToken, async (req, res) => {
  try {
    const email = req.user.email;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    
    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
});

export default router;
