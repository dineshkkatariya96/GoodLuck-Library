import Plan from "../models/Plan.js";

export const createPlan = async (req, res) => {
  try {
    const { name, durationInMonths, price } = req.body;

    if (!name || !durationInMonths || !price) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const plan = await Plan.create({
      name,
      durationInMonths,
      price
    });

    res.json(plan);
  } catch (error) {
    console.error("Error creating plan:", error);
    res.status(500).json({ message: "Error creating plan", error: error.message });
  }
};

export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({ message: "Error fetching plans", error: error.message });
  }
};