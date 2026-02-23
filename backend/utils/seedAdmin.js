import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const seedAdminUser = async () => {
  try {
    const adminEmail = "admin@gmail.com";
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("✅ Admin user already exists");
      return;
    }

    // Hash admin password
    const hashedPassword = await bcrypt.hash("admin@123", 10);

    // Create admin user
    await User.create({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      countryCode: "+91",
      mobileNumber: "0000000000",
    });

    console.log("✅ Admin user created successfully");
    console.log("   Email: admin@gmail.com");
    console.log("   Password: admin@123");
  } catch (error) {
    console.error("❌ Error seeding admin user:", error);
  }
};
