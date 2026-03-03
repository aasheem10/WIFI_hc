const Performance = require('../models/Performance');
const Task = require('../models/Task');

const updatePerformanceAndAdjust = async (userId) => {
  const [completedTasks, skippedTasks] = await Promise.all([
    Task.countDocuments({ userId, status: 'completed' }),
    Task.countDocuments({ userId, status: 'skipped' }),
  ]);

  const total = completedTasks + skippedTasks;
  const consistencyScore = total === 0 ? 50 : Math.round((completedTasks / total) * 100);

  const performance = await Performance.findOneAndUpdate(
    { userId },
    {
      completedTasks,
      skippedTasks,
      consistencyScore,
      lastActiveAt: new Date(),
    },
    { upsert: true, new: true }
  );

  const adjustment = {
    increaseDifficultyByPercent: consistencyScore > 80 ? 10 : 0,
    reduceDailyWorkload: consistencyScore < 40,
  };

  return { performance, adjustment };
};

module.exports = { updatePerformanceAndAdjust };
