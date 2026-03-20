# LifeLine Node Backend

This backend is rebuilt to match the assignment stack:

- Node.js + Express.js
- MongoDB + Mongoose
- JWT authentication
- Password hashing with bcrypt
- Protected routes
- File upload with multer

## Features implemented

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- Hospital CRUD with admin protection and image upload
- Camp CRUD with admin protection
- Donor eligibility endpoints
- Appointment booking, listing, approval, and cancellation
- Admin user management
- Hospital request and emergency request flows
- Inventory and lab testing endpoints
- Recent activity feed and chatbot endpoint

## Setup

1. Install packages:

```bash
npm install
```

2. Copy env file:

```bash
cp .env.example .env
```

3. Update `MONGODB_URI` and `JWT_SECRET`.

Optional chatbot setup:

- `GROQ_API_KEY`
- `GROQ_MODEL` (default: `llama-3.1-8b-instant`)

4. Seed sample data:

```bash
npm run seed
```

5. Start server:

```bash
npm run dev
```

## Default seeded users

- Admin: `admin@lifeline.com` / `admin123`
- Donor: `john@example.com` / `pass123`

## Notes for deployment

- Use MongoDB Atlas for the hosted database
- Set `CLIENT_URL` to your deployed frontend URL
- Set `MONGODB_URI` and `JWT_SECRET` in the hosting platform environment variables
- Set `GROQ_API_KEY` if you want the chatbot to use Groq instead of the local fallback
