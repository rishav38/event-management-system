const Guest = require("../models/Guest");

const addGuest = async (req, res) => {
  try {
    const { name, phone, side, events, rsvp } = req.body;
    const { weddingId } = req.user; // from JWT

    console.log("Received request body:", req.body); // Debug log
    console.log("Adding guest with data:", { name, phone, side, events, weddingId }); // Debug log

    if (!name || !phone || !side) {
      return res.status(400).json({
        success: false,
        message: "Name, phone, and side are required",
      });
    }

    const guestData = {
      name,
      phone,
      side,
      events: Array.isArray(events) ? events : (events ? [events] : []), // Ensure it's an array
      rsvp: rsvp || "PENDING",
      weddingId,
    };

    console.log("Creating guest with:", guestData); // Debug log

    const guest = await Guest.create(guestData);

    console.log("Created guest:", guest.toObject()); // Debug log

    res.status(201).json({
      success: true,
      data: guest,
      message: "Guest added successfully",
    });
  } catch (err) {
    console.error("Error adding guest:", err); // Debug log
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getGuests = async (req, res) => {
  try {
    const { weddingId } = req.user;

    const guests = await Guest.find({ weddingId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: guests,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateGuestRsvp = async (req, res) => {
  try {
    const { id } = req.params;
    const { rsvp } = req.body;
    const { weddingId } = req.user;

    if (!["PENDING", "ACCEPTED", "DECLINED"].includes(rsvp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid RSVP status",
      });
    }

    const guest = await Guest.findOneAndUpdate(
      { _id: id, weddingId },
      { $set: { rsvp } },
      { new: true }
    );

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Guest not found",
      });
    }

    res.json({
      success: true,
      data: guest,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


module.exports = { addGuest, getGuests , updateGuestRsvp};
