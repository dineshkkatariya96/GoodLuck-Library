import Seat from "../models/Seat.js";
import User from "../models/User.js";
import Plan from "../models/Plan.js";

export const getSeats = async (req, res) => {
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
};

export const createSeats = async (req, res) => {
  const { totalSeats } = req.body;

  for (let i = 1; i <= totalSeats; i++) {
    await Seat.create({ seatNumber: i });
  }

  res.json({ message: "Seats created" });
};

export const bookSeat = async (req, res) => {
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
};