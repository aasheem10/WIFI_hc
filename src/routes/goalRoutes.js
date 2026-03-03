const express = require('express');
const { body } = require('express-validator');
const {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { enforceGoalLimit } = require('../middleware/subscriptionMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post(
  '/',
  enforceGoalLimit,
  [
    body('title').notEmpty(),
    body('category').notEmpty(),
    body('deadline').isISO8601(),
    body('difficultyLevel').isIn(['beginner', 'intermediate', 'advanced']),
  ],
  validate,
  createGoal
);
router.get('/', getGoals);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

module.exports = router;
