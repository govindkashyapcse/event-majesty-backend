// routes/eventRoutes.js
import express from "express";

const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  getEventRegistrations
} = require("../controllers/eventController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getEvents);

router.post("/", protect, adminOnly, createEvent);
router.put("/:id", protect, adminOnly, updateEvent);
router.delete("/:id", protect, adminOnly, deleteEvent);

router.get("/:id/registrations", protect, adminOnly, getEventRegistrations);

export default router;
