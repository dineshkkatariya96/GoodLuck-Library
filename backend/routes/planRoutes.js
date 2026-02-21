import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import {
  createPlan,
  getPlans
} from "../controllers/planController.js";

const router = express.Router();

router.get("/", protect, getPlans);
router.post("/", protect, adminOnly, createPlan);

export default router;