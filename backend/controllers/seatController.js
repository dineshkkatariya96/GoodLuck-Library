import Seat from "../models/Seat.js";
import User from "../models/User.js";
import Plan from "../models/Plan.js";

export const getSeats = async (req, res) => {
  try {
    const seats = await Seat.find().sort({ seatNumber: 1 });
    
    // Check for expired bookings and mark as available
    const currentDate = new Date();
    const updatedSeats = seats.map((seat) => {
      if (seat.isBooked && seat.membershipExpiry && seat.membershipExpiry < currentDate) {
        // Booking has expired, mark as available
        return { ...seat.toObject(), isBooked: false, bookedBy: null, membershipExpiry: null };
      }
      return seat.toObject();
    });
    
    res.json(updatedSeats);
  } catch (error) {
    console.error("Error fetching seats:", error);
    res.status(500).json({ message: "Error fetching seats", error: error.message });
  }
};

export const createSeats = async (req, res) => {
  try {
    const { totalSeats } = req.body;

    if (!totalSeats || totalSeats <= 0) {
      return res.status(400).json({ message: "Please provide a valid number of seats" });
    }

    // Check if seats already exist
    const existingCount = await Seat.countDocuments();
    if (existingCount > 0) {
      return res.status(400).json({ message: `Seats already exist (${existingCount} seats). Cannot create new seats.` });
    }

    for (let i = 1; i <= totalSeats; i++) {
      await Seat.create({ seatNumber: i });
    }

    res.json({ message: `${totalSeats} seats created successfully` });
  } catch (error) {
    console.error("Error creating seats:", error);
    res.status(500).json({ message: "Error creating seats", error: error.message });
  }
};

export const bookSeat = async (req, res) => {
  try {
    const { seatNumber, planId } = req.body;
    const userId = req.user._id;

    const seat = await Seat.findOne({ seatNumber });
    if (!seat) return res.status(404).json({ message: "Seat not found" });

    // Check if seat is actually booked and not expired
    const currentDate = new Date();
    if (seat.isBooked && seat.membershipExpiry && seat.membershipExpiry >= currentDate) {
      return res.status(400).json({ message: "Seat already booked" });
    }

    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + plan.durationInMonths);

    seat.isBooked = true;
    seat.bookedBy = userId;
    seat.membershipExpiry = expiry;
    await seat.save();

    await User.findByIdAndUpdate(userId, {
      seatNumber,
      membershipExpiry: expiry
    });

    res.json({ success: true, message: "Seat booked successfully", expiryDate: expiry });
  } catch (error) {
    console.error("Error booking seat:", error);
    res.status(500).json({ message: "Error booking seat", error: error.message });
  }
};