const Chat = require('../models/Chat');
const Subscription = require('../models/Subscription');
const { generateChatReply } = require('../services/aiService');

const chatWithAssistant = async (req, res) => {
  const { message } = req.body;

  let chat = await Chat.findOne({ userId: req.user._id });
  if (!chat) {
    chat = await Chat.create({ userId: req.user._id, messages: [] });
  }

  chat.messages.push({ role: 'user', content: message });
  const assistantReply = await generateChatReply(chat.messages.map(({ role, content }) => ({ role, content })));
  chat.messages.push({ role: 'assistant', content: assistantReply });
  await chat.save();

  await Subscription.findOneAndUpdate({ userId: req.user._id }, { $inc: { aiUsageCount: 1 } });

  return res.json({ reply: assistantReply, messages: chat.messages });
};

module.exports = { chatWithAssistant };
