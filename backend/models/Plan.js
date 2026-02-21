import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: String,
    durationInMonths: Number,
    price: Number
  },
  { timestamps: true }
);

export default mongoose.model("Plan", planSchema);