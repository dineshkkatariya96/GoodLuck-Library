import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: String,
    status: { type: String, default: "Pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Problem", problemSchema);