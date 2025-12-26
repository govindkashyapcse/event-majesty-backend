// routes/registrationRoutes.js
import express from "express";

const {
  registerEvent,
  unregisterEvent,
  myRegistrations
} = require("../controllers/registrationController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:eventId", protect, registerEvent);
router.delete("/:eventId", protect, unregisterEvent);
router.get("/my/events", protect, myRegistrations);

export default router;
