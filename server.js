import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Load environment variables (for Railway)
dotenv.config();

// Route imports
import loginRoutes from "./routes/login.js";
import registerRoutes from "./routes/register.js";
import orderRoutes from "./routes/OrderStore.js";
import myOrders from "./routes/myOrders.js";
import adminOrders from "./routes/adminOrders.js";
import adminUsers from "./routes/users.js";
import refreshRoute from "./routes/refresh.js";
import authCheckRoute from "./routes/authCheck.js";
import adminAuthCheckRoute from "./routes/adminAuthCheck.js";

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Allow both local & deployed frontend
const allowedOrigins = [
  "http://localhost:3000", // local React
  process.env.FRONTEND_URL, // your deployed frontend URL (set in Railway)
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ Environment Variables
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Swiggy";

// ✅ MongoDB Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use("/swiggy/login", loginRoutes);
app.use("/swiggy/register", registerRoutes);
app.use("/swiggy/refresh", refreshRoute);
app.use("/swiggy/orders", orderRoutes);
app.use("/swiggy/myorders", myOrders);
app.use("/swiggy/admin/orders", adminOrders);
app.use("/swiggy/admin/users", adminUsers);
app.use("/swiggy/auth-check", authCheckRoute);
app.use("/swiggy/admin/auth-check", adminAuthCheckRoute);

// ✅ Root route (health check)
app.get("/", (req, res) => {
  res.send("🚀 Swiggy Backend is deployed successfully on Railway!");
});

// ✅ Start Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
