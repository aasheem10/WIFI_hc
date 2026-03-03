const Goal = require('../models/Goal');
const Roadmap = require('../models/Roadmap');
const { generateRoadmap } = require('../services/aiService');
const { generateDailyTasksFromRoadmap } = require('../services/taskService');

const createGoal = async (req, res) => {
  const goal = await Goal.create({ ...req.body, userId: req.user._id });

  const phases = await generateRoadmap({
    title: goal.title,
    deadline: goal.deadline,
    difficultyLevel: goal.difficultyLevel,
  });

  await Roadmap.findOneAndUpdate(
    { goalId: goal._id },
    { goalId: goal._id, phases },
    { upsert: true, new: true }
  );

  await generateDailyTasksFromRoadmap({
    userId: req.user._id,
    goalId: goal._id,
    phases,
    difficultyLevel: goal.difficultyLevel,
  });

  return res.status(201).json({ goal });
};

const getGoals = async (req, res) => {
  const goals = await Goal.find({ userId: req.user._id }).sort({ createdAt: -1 });
  return res.json({ goals });
};

const updateGoal = async (req, res) => {
  const goal = await Goal.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, {
    new: true,
  });

  if (!goal) return res.status(404).json({ message: 'Goal not found' });
  return res.json({ goal });
};

const deleteGoal = async (req, res) => {
  const deleted = await Goal.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!deleted) return res.status(404).json({ message: 'Goal not found' });

  await Roadmap.deleteOne({ goalId: req.params.id });
  return res.json({ message: 'Goal deleted' });
};

module.exports = { createGoal, getGoals, updateGoal, deleteGoal };
