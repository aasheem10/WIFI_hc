const cron = require('node-cron');
const Task = require('../models/Task');
const Goal = require('../models/Goal');
const { sendNotification, notifyInactiveUsers } = require('./notificationService');

const startCronJobs = () => {
  cron.schedule('0 8 * * *', async () => {
    const pendingTasks = await Task.find({ status: 'pending' }).limit(100);
    await Promise.all(
      pendingTasks.map((task) =>
        sendNotification({
          userId: task.userId,
          title: 'Daily task reminder',
          body: `Pending: ${task.title}`,
        })
      )
    );
  });

  cron.schedule('0 9 * * *', async () => {
    const nearDeadline = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    const goals = await Goal.find({ deadline: { $lte: nearDeadline }, status: 'active' }).limit(100);
    await Promise.all(
      goals.map((goal) =>
        sendNotification({
          userId: goal.userId,
          title: 'Deadline approaching',
          body: `Your goal "${goal.title}" is close to deadline.`,
        })
      )
    );
  });

  cron.schedule('0 10 * * *', async () => {
    await notifyInactiveUsers();
  });

  console.log('Cron jobs initialized');
};

module.exports = { startCronJobs };
