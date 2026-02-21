import Plan from "../models/Plan.js";

export const createPlan = async (req, res) => {
  const { name, durationInMonths, price } = req.body;

  const plan = await Plan.create({
    name,
    durationInMonths,
    price
  });

  res.json(plan);
};

export const getPlans = async (req, res) => {
  const plans = await Plan.find();
  res.json(plans);
};