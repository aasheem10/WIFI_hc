const Subscription = require('../models/Subscription');
const { addMonths } = require('../utils/date');
const { PLAN_MONTHS, createCheckoutSession } = require('../services/subscriptionService');

const subscribe = async (req, res) => {
  const { planType } = req.body;
  if (!PLAN_MONTHS[planType]) {
    return res.status(400).json({ message: 'Invalid plan type' });
  }

  const checkout = await createCheckoutSession({ planType, userId: req.user._id });
  const startDate = new Date();
  const endDate = addMonths(startDate, PLAN_MONTHS[planType]);

  const subscription = await Subscription.findOneAndUpdate(
    { userId: req.user._id },
    {
      planType,
      startDate,
      endDate,
      status: 'active',
      paymentId: checkout.id,
      aiUsageCount: 0,
    },
    { upsert: true, new: true }
  );

  return res.json({ subscription, checkoutSession: checkout });
};

const getSubscriptionStatus = async (req, res) => {
  const subscription = await Subscription.findOne({ userId: req.user._id });
  return res.json({ subscription });
};

module.exports = { subscribe, getSubscriptionStatus };
