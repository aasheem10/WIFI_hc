const openaiClient = require('../config/openai');

const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

const parseJsonSafe = (text, fallback) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    return fallback;
  }
};

const generateRoadmap = async ({ title, deadline, difficultyLevel }) => {
  if (!openaiClient) {
    return [
      { title: 'Foundation', duration: '2 weeks', topics: [`Basics of ${title}`] },
      { title: 'Core Progress', duration: '4 weeks', topics: ['Practice', 'Mock tasks'] },
      { title: 'Revision', duration: '2 weeks', topics: ['Weak areas', 'Final review'] },
    ];
  }

  const prompt = `Create a roadmap for goal: ${title}. Deadline: ${deadline}. Difficulty: ${difficultyLevel}. Return pure JSON array with objects: title, duration, topics(string[])`;
  const response = await openaiClient.chat.completions.create({
    model,
    temperature: 0.3,
    messages: [{ role: 'user', content: prompt }],
  });

  const content = response.choices?.[0]?.message?.content || '[]';
  const parsed = parseJsonSafe(content, []);
  return Array.isArray(parsed) ? parsed : [];
};

const generateChatReply = async (messages) => {
  if (!openaiClient) {
    return 'AI provider not configured. Add OPENAI_API_KEY to enable smart coaching responses.';
  }

  const completion = await openaiClient.chat.completions.create({
    model,
    temperature: 0.5,
    messages,
  });

  return completion.choices?.[0]?.message?.content || 'Keep going. Consistency compounds success.';
};

module.exports = { generateRoadmap, generateChatReply };
