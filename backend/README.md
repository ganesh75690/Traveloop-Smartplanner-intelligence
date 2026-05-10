# Traveloop Backend API

A production-ready Node.js + Express + PostgreSQL backend for the AI-powered travel application.

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT with refresh tokens
- **Security**: Helmet, CORS, Rate Limiting, bcrypt

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/           # Database & app configuration
│   ├── controllers/      # API controllers
│   ├── middleware/       # Express middleware
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   ├── validators/       # Input validation
│   └── server.js         # Main entry point
├── prisma/
│   └── schema.prisma     # Database schema
├── .env                  # Environment variables
└── package.json
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup PostgreSQL

Create a PostgreSQL database:

```sql
CREATE DATABASE traveloop;
```

Update `.env` with your database credentials:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/traveloop?schema=public"
```

### 3. Run Database Migrations

```bash
npx prisma migrate dev --name init
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Start the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `DATABASE_URL` | PostgreSQL connection string | - |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_REFRESH_SECRET` | JWT refresh token secret | - |
| `CORS_ORIGIN` | Allowed CORS origins | http://localhost:5173 |
| `NODE_ENV` | Environment mode | development |

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/refresh` | Refresh access token |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout user |
| POST | `/api/auth/forgot-password` | Request password reset |

### Trips

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/trips` | Get all user trips |
| POST | `/api/trips` | Create new trip |
| GET | `/api/trips/:id` | Get trip details |
| PUT | `/api/trips/:id` | Update trip |
| DELETE | `/api/trips/:id` | Delete trip |
| POST | `/api/trips/:id/stops` | Add trip stop |
| POST | `/api/trips/:id/activities` | Add trip activity |

## 🔒 Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## 📊 Database Schema

The schema includes models for:

- **Users & Profiles** - User accounts, profiles, preferences
- **Trips** - Trip planning, stops, activities
- **Expenses** - Budget tracking, split expenses
- **Packing** - Packing lists, templates
- **Journal** - Travel journals, memories
- **Community** - Posts, comments, likes
- **Notifications** - User notifications
- **Support** - Help tickets, FAQs

## 🧪 Testing

The backend is ready for testing with tools like:
- Postman
- Insomnia
- cURL

Example login request:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

## 🚀 Production Deployment

1. Set `NODE_ENV=production`
2. Use strong JWT secrets
3. Configure proper CORS origins
4. Set up PostgreSQL with SSL
5. Use process manager (PM2)
6. Configure logging with Winston

## 📞 Support

For issues and questions, refer to the API documentation or contact the development team.

---

**Built with ❤️ by Traveloop Team**
