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

## Setup
1. Copy `.env.example` to `.env`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run server:
   ```bash
   npm run dev
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
