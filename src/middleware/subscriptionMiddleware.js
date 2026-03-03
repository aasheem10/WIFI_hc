const Goal = require('../models/Goal');
const Subscription = require('../models/Subscription');

const ensureActiveSubscription = async (userId) => {
  let subscription = await Subscription.findOne({ userId });
  if (!subscription) {
    subscription = await Subscription.create({ userId, planType: 'free' });
  }

  if (subscription.endDate && subscription.endDate < new Date()) {
    subscription.status = 'expired';
    subscription.planType = 'free';
    await subscription.save();
  }

  return subscription;
};

const requireAIUsageAccess = async (req, res, next) => {
  const subscription = await ensureActiveSubscription(req.user._id);

  if (subscription.planType === 'free' && subscription.aiUsageCount >= 20) {
    return res.status(403).json({ message: 'AI usage limit reached for free plan' });
  }

  req.subscription = subscription;
  return next();
};

const enforceGoalLimit = async (req, res, next) => {
  const subscription = await ensureActiveSubscription(req.user._id);

  if (subscription.planType === 'free') {
    const activeGoals = await Goal.countDocuments({ userId: req.user._id, status: 'active' });
    if (activeGoals >= 1) {
      return res.status(403).json({ message: 'Free plan supports only 1 active goal' });
    }
  }

  req.subscription = subscription;
  return next();
};

module.exports = {
  ensureActiveSubscription,
  requireAIUsageAccess,
  enforceGoalLimit,
};
