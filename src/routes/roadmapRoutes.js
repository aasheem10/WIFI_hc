const express = require('express');
const { getRoadmapByGoal } = require('../controllers/roadmapController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:goalId', authMiddleware, getRoadmapByGoal);

module.exports = router;
