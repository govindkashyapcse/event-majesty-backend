// routes/dashboardRoutes.js
import express from "express";

const {
  adminDashboard,
  userDashboard
} = require("../controllers/dashboardController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/* Admin Dashboard */
router.get("/admin", protect, adminOnly, adminDashboard);

/* User Dashboard */
router.get("/user", protect, userDashboard);

export default router;
