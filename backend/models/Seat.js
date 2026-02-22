import mongoose from "mongoose";

const seatSchema = new mongoose.Schema(
  {
    seatNumber: { type: Number, unique: true },
    isBooked: { type: Boolean, default: false },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    membershipExpiry: { type: Date, default: null }
  },
  { timestamps: true }
);

export default mongoose.model("Seat", seatSchema);