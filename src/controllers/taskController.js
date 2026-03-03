const Task = require('../models/Task');
const { updatePerformanceAndAdjust } = require('../services/performanceService');

const getTodayTasks = async (req, res) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  const tasks = await Task.find({
    userId: req.user._id,
    date: { $gte: start, $lt: end },
  }).sort({ date: 1 });

  return res.json({ tasks });
};

const markTaskComplete = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { status: 'completed' },
    { new: true }
  );

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const performance = await updatePerformanceAndAdjust(req.user._id);
  return res.json({ task, performance });
};

module.exports = { getTodayTasks, markTaskComplete };
