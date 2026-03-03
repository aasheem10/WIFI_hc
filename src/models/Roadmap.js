const mongoose = require('mongoose');

const phaseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    duration: { type: String, required: true },
    topics: [{ type: String }],
  },
  { _id: false }
);

const roadmapSchema = new mongoose.Schema(
  {
    goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal', required: true, unique: true },
    phases: [phaseSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Roadmap', roadmapSchema);
