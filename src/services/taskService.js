const Task = require('../models/Task');

const generateDailyTasksFromRoadmap = async ({ userId, goalId, phases, difficultyLevel }) => {
  const baseTime = difficultyLevel === 'advanced' ? 120 : difficultyLevel === 'intermediate' ? 90 : 60;

  const tasks = phases.slice(0, 3).map((phase, idx) => ({
    userId,
    goalId,
    title: `${phase.title}: ${phase.topics?.[0] || 'Focus task'}`,
    description: `Complete today's work for phase: ${phase.title}`,
    date: new Date(Date.now() + idx * 24 * 60 * 60 * 1000),
    status: 'pending',
    timeRequired: baseTime,
  }));

  if (!tasks.length) return [];
  return Task.insertMany(tasks);
};

module.exports = { generateDailyTasksFromRoadmap };
