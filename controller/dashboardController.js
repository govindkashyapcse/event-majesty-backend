// controllers/dashboardController.js
import Event from "../models/Event";
import Registration from "../models/Registration";

/* ===========================
   ADMIN DASHBOARD
=========================== */
exports.adminDashboard = async (req, res) => {
  try {
    const now = new Date();

    const totalEvents = await Event.countDocuments();
    const upcomingEvents = await Event.countDocuments({ date: { $gte: now } });
    const completedEvents = await Event.countDocuments({ date: { $lt: now } });
    const totalRegistrations = await Registration.countDocuments();

    const recentEvents = await Event.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalEvents,
      upcomingEvents,
      completedEvents,
      totalRegistrations,
      recentEvents
    });
  } catch (err) {
    res.status(500).json({ msg: "Dashboard fetch failed" });
  }
};

/* ===========================
   USER DASHBOARD
=========================== */
exports.userDashboard = async (req, res) => {
  try {
    const now = new Date();

    const registrations = await Registration.find({
      userId: req.user.id
    }).populate("eventId");

    const totalRegistered = registrations.length;

    const upcomingEvents = registrations.filter(
      r => r.eventId.date >= now
    );

    const completedEvents = registrations.filter(
      r => r.eventId.date < now
    );

    res.json({
      totalRegistered,
      upcomingCount: upcomingEvents.length,
      completedCount: completedEvents.length,
      upcomingEvents,
      completedEvents
    });
  } catch {
    res.status(500).json({ msg: "User dashboard fetch failed" });
  }
};
