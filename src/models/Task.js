const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal', required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    date: { type: Date, required: true, index: true },
    status: { type: String, enum: ['pending', 'completed', 'skipped'], default: 'pending' },
    timeRequired: { type: Number, default: 60 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
