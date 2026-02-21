import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import {
  getSeats,
  createSeats,
  bookSeat
} from "../controllers/seatController.js";

const router = express.Router();

router.get("/", protect, getSeats);
router.post("/create", protect, adminOnly, createSeats);
router.post("/book", protect, bookSeat);

export default router;