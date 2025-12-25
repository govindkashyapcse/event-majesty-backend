// controllers/registrationController.js
import Event from "../models/Event";
import Registration from "../models/Registration";

/* User: Register for Event */
exports.registerEvent = async (req, res) => {
  const event = await Event.findById(req.params.eventId);
  if (!event) return res.status(404).json({ msg: "Event not found" });

  const count = await Registration.countDocuments({
    eventId: event._id
  });

  if (count >= event.capacity)
    return res.status(400).json({ msg: "Event is full" });

  try {
    const registration = await Registration.create({
      userId: req.user.id,
      eventId: event._id
    });
    res.status(201).json(registration);
  } catch {
    res.status(400).json({ msg: "Already registered" });
  }
};

/* User: Unregister */
exports.unregisterEvent = async (req, res) => {
  await Registration.findOneAndDelete({
    userId: req.user.id,
    eventId: req.params.eventId
  });
  res.json({ msg: "Unregistered successfully" });
};

/* User: My Events */
exports.myRegistrations = async (req, res) => {
  const events = await Registration.find({ userId: req.user.id })
    .populate("eventId");

  res.json(events);
};
