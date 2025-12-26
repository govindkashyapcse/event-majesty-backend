// controllers/eventController.js
import Event from "../models/Event";
import Registration from "../models/Registration";

/* Admin: Create Event */
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

/* Public: Get All Events */
exports.getEvents = async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json(events);
};

/* Admin: Update Event */
exports.updateEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!event) return res.status(404).json({ msg: "Event not found" });
  res.json(event);
};

/* Admin: Delete Event */
exports.deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  await Registration.deleteMany({ eventId: req.params.id });
  res.json({ msg: "Event deleted" });
};

/* Admin: View Event Registrations */
exports.getEventRegistrations = async (req, res) => {
  const registrations = await Registration.find({
    eventId: req.params.id
  }).populate("userId", "name email");

  res.json(registrations);
};
