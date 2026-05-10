# Traveloop Backend Integration Guide

## 🚀 Quick Start Guide

### Prerequisites
- PostgreSQL installed and running locally
- Node.js 18+ installed
- npm installed

### Step 1: Database Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Test database connection
npm run db:test

# Setup sample data (optional)
npm run db:setup
```

### Step 2: Start Backend Server
```bash
# Start development server
npm run dev

# Server will run on http://localhost:5000
# API endpoints available at http://localhost:5000/api
```

### Step 3: Test Authentication
```bash
# Test complete authentication flow
npm run auth:test
```

### Step 4: Test CRUD Operations
```bash
# Test all CRUD operations
npm run crud:test
```

### Step 5: Start Frontend
```bash
# Navigate to frontend directory
cd ../

# Start frontend (will proxy API calls to backend)
npm run dev

# Frontend will run on http://localhost:5173
# API calls will be proxied to http://localhost:5000/api
```

## 📊 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start backend development server |
| `npm run db:test` | Test PostgreSQL connection |
| `npm run auth:test` | Test authentication system |
| `npm run crud:test` | Test all CRUD operations |
| `npm run db:setup` | Create sample data |
| `npm run db:studio` | Open Prisma Studio (GUI) |
| `npm run db:migrate` | Run database migrations |

## 🔐 Test Credentials

After running `npm run db:setup`, you can use:
- **Email**: demo@traveloop.com
- **Password**: password123

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token

### Trips
- `GET /api/trips` - Get all trips
- `POST /api/trips` - Create trip
- `GET /api/trips/:id` - Get trip by ID
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/insights` - Get budget insights

### Packing
- `GET /api/packing` - Get packing items
- `POST /api/packing` - Create packing item
- `PATCH /api/packing/:id/toggle` - Toggle packed status
- `GET /api/packing/suggestions` - Get AI suggestions

### Journal
- `GET /api/journal` - Get journal entries
- `POST /api/journal` - Create journal entry
- `GET /api/journal/:id` - Get entry by ID
- `PUT /api/journal/:id` - Update entry
- `DELETE /api/journal/:id` - Delete entry

### Community
- `GET /api/community` - Get community posts
- `POST /api/community` - Create post
- `POST /api/community/:id/like` - Like/unlike post
- `POST /api/community/:id/comments` - Add comment

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/preferences` - Update preferences
- `PUT /api/users/change-password` - Change password
- `DELETE /api/users/account` - Delete account

## 🔧 Environment Variables

Create `.env` file in backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://postgres:password@localhost:5432/traveloop?schema=public"

# JWT Authentication
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_REFRESH_SECRET="your-refresh-secret-key-change-this-in-production"

# CORS Configuration
CORS_ORIGIN="http://localhost:5173,http://localhost:3000"
```

## 🐛 Troubleshooting

### Database Connection Issues
1. Ensure PostgreSQL is running: `pg_ctl status`
2. Check database exists: `psql -l`
3. Verify credentials in DATABASE_URL
4. Run `npm run db:test` to test connection

### Server Issues
1. Check if port 5000 is in use: `netstat -an | grep 5000`
2. Verify dependencies are installed: `npm list`
3. Check logs for error messages

### Frontend Integration Issues
1. Ensure Vite proxy is configured in `vite.config.js`
2. Check CORS origins match frontend URL
3. Verify JWT token is stored in localStorage
4. Check browser network tab for API calls

## 📝 Development Workflow

1. **Backend**: `cd backend && npm run dev`
2. **Frontend**: `cd .. && npm run dev`
3. **Database**: Use Prisma Studio: `npm run db:studio`
4. **Testing**: Run test scripts as needed
5. **Logs**: Check console for detailed logs

## 🚀 Production Deployment

1. Update environment variables for production
2. Set `NODE_ENV=production`
3. Use production database URL
4. Generate production build: `npm run build`
5. Deploy to hosting service

## ✅ Integration Checklist

- [ ] PostgreSQL installed and running
- [ ] Database migrated successfully
- [ ] Backend server starts without errors
- [ ] Authentication system working
- [ ] All CRUD operations tested
- [ ] Frontend connects to backend
- [ ] JWT tokens stored correctly
- [ ] API responses match frontend expectations
- [ ] No console errors in browser
- [ ] All pages load correctly
- [ ] Dark mode works
- [ ] Responsive design works

## 📞 Support

For issues:
1. Check console logs
2. Run test scripts
3. Verify PostgreSQL connection
4. Check API responses in browser Network tab
5. Review this guide for troubleshooting steps
