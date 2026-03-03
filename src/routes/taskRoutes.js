const express = require('express');
const { getTodayTasks, markTaskComplete } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/today', getTodayTasks);
router.put('/:id/complete', markTaskComplete);

module.exports = router;
