import Problem from "../models/Problem.js";

export const raiseProblem = async (req, res) => {
  const problem = await Problem.create({
    user: req.user._id,
    message: req.body.message
  });

  res.json(problem);
};

export const getProblems = async (req, res) => {
  const problems = await Problem.find().populate("user", "name email");
  res.json(problems);
};