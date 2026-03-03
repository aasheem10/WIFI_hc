const express = require('express');
const { body } = require('express-validator');
const { chatWithAssistant } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { requireAIUsageAccess } = require('../middleware/subscriptionMiddleware');

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  requireAIUsageAccess,
  [body('message').isLength({ min: 1, max: 2000 })],
  validate,
  chatWithAssistant
);

module.exports = router;
