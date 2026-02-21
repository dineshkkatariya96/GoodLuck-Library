import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import {
  raiseProblem,
  getProblems
} from "../controllers/problemController.js";

const router = express.Router();

router.post("/", protect, raiseProblem);
router.get("/", protect, adminOnly, getProblems);

export default router;