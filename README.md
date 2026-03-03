# Goal Tracker AI Backend

Production-ready, modular Node.js backend for an AI-powered goal tracking SaaS.

## Features
- JWT auth with bcrypt password hashing
- Goal CRUD with AI roadmap generation
- Daily task generation and completion tracking
- Smart performance adjustment logic
- AI chat assistant with usage control
- Subscription support (free + paid) with Stripe integration hooks
- Scheduled reminders and inactive-user notifications via cron
- Security with Helmet, CORS, rate limiter, and express-validator

## Where to run it
Run all commands from the project root:

```bash
/workspace/WIFI_hc
```

## Setup
1. From `/workspace/WIFI_hc`, copy `.env.example` to `.env`
2. Fill required values in `.env` (at minimum `MONGO_URI` and `JWT_SECRET`)
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start in development mode:
   ```bash
   npm run dev
   ```
5. Or start in production mode:
   ```bash
   npm start
   ```

## Quick run checklist
- MongoDB must be running and reachable by `MONGO_URI`
- Optional: add `OPENAI_API_KEY` for real AI responses
- Optional: add `STRIPE_SECRET_KEY` for real payment flow
- Health check after start:
  ```bash
  curl http://localhost:5000/health
  ```

## API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `POST /api/goals`
- `GET /api/goals`
- `PUT /api/goals/:id`
- `DELETE /api/goals/:id`
- `GET /api/roadmap/:goalId`
- `GET /api/tasks/today`
- `PUT /api/tasks/:id/complete`
- `POST /api/chat`
- `POST /api/subscribe`
- `GET /api/subscription-status`

## Notes
- If OpenAI or Stripe keys are missing, fallback mock behavior is used for local development.
- Notification service currently logs messages and can be replaced with Firebase Cloud Messaging integration.
