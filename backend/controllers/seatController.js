import Seat from "../models/Seat.js";
import User from "../models/User.js";
import Plan from "../models/Plan.js";

export const getSeats = async (req, res) => {
  const seats = await Seat.find().sort({ seatNumber: 1 });
  res.json(seats);
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

  if (seat.isBooked)
    return res.status(400).json({ message: "Seat already booked" });

  const plan = await Plan.findById(planId);

  const expiry = new Date();
  expiry.setMonth(expiry.getMonth() + plan.durationInMonths);

  seat.isBooked = true;
  seat.bookedBy = userId;
  await seat.save();

  await User.findByIdAndUpdate(userId, {
    seatNumber,
    membershipExpiry: expiry
  });

  res.json({ message: "Seat booked successfully" });
};