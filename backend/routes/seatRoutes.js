import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import {
  getSeats,
  createSeats,
  bookSeat,
  getSeatsWithUserDetails,
  deleteSeat
} from "../controllers/seatController.js";

const router = express.Router();

router.get("/", protect, getSeats);
router.get("/admin/details", protect, adminOnly, getSeatsWithUserDetails);
router.post("/create", protect, adminOnly, createSeats);
router.post("/book", protect, bookSeat);
router.delete("/:id", protect, adminOnly, deleteSeat);

export default router;