const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    planType: { type: String, enum: ['free', '1m', '6m', '1y'], default: 'free' },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: null },
    status: { type: String, enum: ['active', 'expired'], default: 'active' },
    paymentId: { type: String, default: null },
    aiUsageCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);
