const Roadmap = require('../models/Roadmap');
const Goal = require('../models/Goal');

const getRoadmapByGoal = async (req, res) => {
  const goal = await Goal.findOne({ _id: req.params.goalId, userId: req.user._id });
  if (!goal) {
    return res.status(404).json({ message: 'Goal not found' });
  }

  const roadmap = await Roadmap.findOne({ goalId: req.params.goalId });
  return res.json({ roadmap });
};

module.exports = { getRoadmapByGoal };
