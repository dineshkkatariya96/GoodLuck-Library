import OTP from "../models/OTP.js";

export const generateOTP = async (req, res) => {
  try {
    const { mobileNumber, countryCode } = req.body;

    if (!mobileNumber || !countryCode) {
      return res.status(400).json({ message: "Mobile number and country code are required" });
    }

    if (mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
      return res.status(400).json({ message: "Enter a valid 10 digit mobile number" });
    }

    // Generate a random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Delete any existing OTP for this mobile number
    await OTP.deleteMany({ mobileNumber, countryCode });

    // Save the new OTP
    const otpRecord = await OTP.create({
      mobileNumber,
      countryCode,
      otp,
    });

    // In production, you would send OTP via SMS service like Twilio
    // For now, we're returning it directly for testing
    // Remove this in production and use SMS service instead
    console.log(`OTP for ${countryCode} ${mobileNumber}: ${otp}`);

    res.json({
      success: true,
      message: "OTP generated successfully",
      otp: otp, // Remove this in production
    });
  } catch (error) {
    console.error("OTP generation error:", error);
    res.status(500).json({ message: "Failed to generate OTP", error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { mobileNumber, countryCode, otp } = req.body;

    if (!mobileNumber || !countryCode || !otp) {
      return res.status(400).json({ message: "Mobile number, country code, and OTP are required" });
    }

    // Find the OTP record
    const otpRecord = await OTP.findOne({
      mobileNumber,
      countryCode,
      otp,
    });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // OTP is valid, delete it so it can't be reused
    await OTP.deleteOne({ _id: otpRecord._id });

    res.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "Failed to verify OTP", error: error.message });
  }
};
