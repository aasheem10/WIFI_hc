const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    completedTasks: { type: Number, default: 0 },
    skippedTasks: { type: Number, default: 0 },
    consistencyScore: { type: Number, default: 50, min: 0, max: 100 },
    lastActiveAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Performance', performanceSchema);
