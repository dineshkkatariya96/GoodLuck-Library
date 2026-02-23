import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan
} from "../controllers/planController.js";

const router = express.Router();

router.get("/", protect, getPlans);
router.post("/", protect, adminOnly, createPlan);
router.put("/:id", protect, adminOnly, updatePlan);
router.delete("/:id", protect, adminOnly, deletePlan);

export default router;