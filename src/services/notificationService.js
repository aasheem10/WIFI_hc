const Performance = require('../models/Performance');

const sendNotification = async ({ userId, title, body }) => {
  console.log(`Notification -> user:${userId} | ${title} | ${body}`);
  return true;
};

const notifyInactiveUsers = async () => {
  const cutoff = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
  const inactive = await Performance.find({ lastActiveAt: { $lt: cutoff } });

  await Promise.all(
    inactive.map((entry) =>
      sendNotification({
        userId: entry.userId,
        title: 'We miss you!',
        body: 'You have been inactive for 3+ days. Resume your goal journey today.',
      })
    )
  );
};

module.exports = { sendNotification, notifyInactiveUsers };
