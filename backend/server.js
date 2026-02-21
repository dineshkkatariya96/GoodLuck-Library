import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import seatRoutes from "./routes/seatRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("GoodLuck backend + MongoDB connected 🚀");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/problems", problemRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found ❌" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});