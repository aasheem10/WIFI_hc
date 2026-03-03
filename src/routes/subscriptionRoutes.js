const express = require('express');
const { body } = require('express-validator');
const { subscribe, getSubscriptionStatus } = require('../controllers/subscriptionController');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');

const router = express.Router();

router.use(authMiddleware);
router.post('/subscribe', [body('planType').isIn(['1m', '6m', '1y'])], validate, subscribe);
router.get('/subscription-status', getSubscriptionStatus);

module.exports = router;
