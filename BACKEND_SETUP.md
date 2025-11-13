# Nikhire Backend Setup Guide

## Prerequisites

Before starting, ensure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (Community Edition) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

## Installation Steps

### 1. Start MongoDB

**On Windows:**
```bash
mongod
```

This will start MongoDB on the default port `27017`.

**Using MongoDB Atlas (Cloud):**
If you prefer to use MongoDB Atlas instead of local MongoDB:
1. Create an account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Update the `MONGODB_URI` in `.env` file with your connection string

### 2. Install Backend Dependencies

```bash
cd c:\Users\David\Documents\Octahire_App\NikHire
npm install
```

### 3. Configure Environment Variables

The `.env` file is already created with default settings:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/nikhire
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
CORS_ORIGIN=http://localhost:8000
```

**Important:** For production, change the `JWT_SECRET` to a strong random string.

### 4. Start the Application

**Option A: Run Server and Client Separately**

Terminal 1 - Start Backend Server:
```bash
npm run server
```
Server will run on http://localhost:5000

Terminal 2 - Start Frontend Client:
```bash
npm run client
```
Client will run on http://localhost:8000

**Option B: Run Both Simultaneously**
```bash
npm run dev
```

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:8000
```

## Features

### Authentication
- User registration with email and password
- Secure login with JWT tokens
- Password hashing with bcryptjs
- Token-based session management

### User Management
- Student and Admin roles
- User profiles with institution and occupation
- Profile image storage

### Job Management
- Browse available jobs
- Apply for jobs
- Track application status
- Admin: Create and manage job postings

### Task Management
- Students: View assigned tasks
- Admin: Assign tasks to students
- Due date tracking

### Institution Management
- List of Nigerian institutions
- Add new institutions

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Users
- `GET /api/users` - Get all users (requires auth)
- `PUT /api/users/:id` - Update user profile

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create new job (requires auth)

### Applications
- `GET /api/applications` - Get user applications
- `GET /api/applications/all` - Get all applications (admin)
- `POST /api/applications` - Apply for a job

### Tasks
- `GET /api/tasks` - Get user tasks
- `POST /api/tasks` - Create task (admin only)

### Institutions
- `GET /api/institutions` - Get all institutions
- `POST /api/institutions` - Add new institution

## Testing

### Test Registration
1. Click "Register" on the home page
2. Enter email and password
3. Provide your name
4. Submit

### Test Login
1. Click "Login" on the home page
2. Enter your credentials
3. Click "Login"

### Test Admin Features
1. Register a new user
2. In MongoDB, update the user's `role` to `admin`
3. Login and access admin dashboard

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod` command
- Check MongoDB is listening on port 27017
- Verify MONGODB_URI in `.env` file

### Port Already in Use
If port 5000 or 8000 is in use:
- Change `PORT` in `.env` for backend
- Use `npm run client -- -p 8001` for frontend on different port

### CORS Errors
- Verify `CORS_ORIGIN` in `.env` matches frontend URL
- Default is `http://localhost:8000`

### Token Expired
- Tokens expire after 7 days
- User will need to login again

## Security Notes

⚠️ **For Production:**
1. Change `JWT_SECRET` to a strong random string
2. Set `NODE_ENV=production`
3. Use environment-specific `.env` files
4. Enable HTTPS
5. Use MongoDB Atlas with authentication
6. Implement rate limiting
7. Add input validation and sanitization
8. Use CORS whitelist

## Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'student' | 'admin',
  institution: String,
  occupation: String,
  profileImage: String,
  createdAt: Date
}
```

### Job
```javascript
{
  title: String,
  company: String,
  description: String,
  createdBy: ObjectId (ref User),
  createdAt: Date
}
```

### Application
```javascript
{
  userId: ObjectId (ref User),
  jobId: ObjectId (ref Job),
  jobTitle: String,
  company: String,
  status: 'Applied' | 'Reviewed' | 'Accepted' | 'Rejected',
  appliedAt: Date
}
```

### Task
```javascript
{
  studentId: ObjectId (ref User),
  description: String,
  dueDate: Date,
  status: 'Pending' | 'In Progress' | 'Completed',
  assignedBy: ObjectId (ref User),
  createdAt: Date
}
```

### Institution
```javascript
{
  name: String (unique),
  createdAt: Date
}
```

## Next Steps

1. Deploy to a cloud platform (Heroku, AWS, etc.)
2. Set up proper logging and monitoring
3. Implement email notifications
4. Add resume upload functionality
5. Create advanced search and filtering
6. Build mobile app using React Native or Flutter
7. Implement interview scheduling system

## Support

For issues or questions, please open an issue on GitHub.
