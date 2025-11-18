# NikHire Backend Setup & Launch Guide

## Quick Start (Copy-Paste These Commands)

### Terminal 1: Start Backend Server (Port 3000)
```powershell
cd 'c:\Users\David\Documents\Octahire_App\NikHire'
npm install
npm run server
```

**Expected Output:**
```
✓ MongoDB connected
OR
✓ Connected to in-memory MongoDB
🚀 Server running on http://localhost:3000
```

### Terminal 2: Start Frontend Client (Port 8000)
```powershell
cd 'c:\Users\David\Documents\Octahire_App\NikHire'
npm run client
```

**Expected Output:**
```
Starting up http-server, serving .
Available on:
  http://localhost:8000
```

### Terminal 3 (Optional): Run Both Together
```powershell
cd 'c:\Users\David\Documents\Octahire_App\NikHire'
npm run dev
```

---

## Access the App

- **Frontend:** Open http://localhost:8000 in your browser
- **Backend API:** http://localhost:3000/api
- **API Docs:** See routes in `server.js`

---

## Default Test Credentials

### Register New User:
1. Click "Register" button
2. Enter email, password, and name
3. Select role: "student" or create admin account

### Create Admin User (for testing):
```javascript
// In browser console after registering:
const token = localStorage.getItem('authToken');
// Admin can:
// - Create jobs
// - Assign tasks to students
// - View all users and applications
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Users
- `GET /api/users` - Get all users
- `PUT /api/users/:id` - Update user profile

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create new job (requires token)

### Applications
- `GET /api/applications` - Get user's applications
- `GET /api/applications/all` - Get all applications (admin)
- `POST /api/applications` - Apply for a job

### Tasks
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Assign task to student (admin)

### Institutions
- `GET /api/institutions` - Get all institutions
- `POST /api/institutions` - Add new institution

---

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, edit `.env`:
```
PORT=3001
```
Then update `js/api-client.js`:
```javascript
constructor(baseURL = 'http://localhost:3001')
```

### MongoDB Connection Issues
The server automatically falls back to in-memory MongoDB if local MongoDB is unavailable. You don't need to install MongoDB locally.

### CORS Errors
Ensure both servers are running:
- Backend on `http://localhost:3000`
- Frontend on `http://localhost:8000`

### Clear Browser Cache
If you see old data:
```javascript
// In browser console:
localStorage.clear();
location.reload();
```

---

## Project Structure

```
NikHire/
├── server.js                 # Express backend with MongoDB
├── index.html               # Frontend HTML
├── js/
│   ├── app.js              # Frontend app logic
│   └── api-client.js       # API communication
├── .env                     # Configuration (PORT=3000)
├── package.json            # Dependencies
└── README.md               # Main documentation
```

---

## Features

✅ User Registration & Authentication with JWT  
✅ Student Dashboard with Job Listings  
✅ Job Applications & Status Tracking  
✅ Admin Dashboard for Job & Task Management  
✅ Student Profile Management  
✅ In-Memory MongoDB (no installation needed)  
✅ CORS Enabled for Frontend-Backend Communication  

---

## Database

All data is stored in MongoDB (real or in-memory):
- **Users** - Registered students and admins
- **Jobs** - Job postings
- **Applications** - Student job applications
- **Tasks** - Tasks assigned to students
- **Institutions** - Nigerian universities list

---

## Development

To make changes:
1. Edit `server.js` for backend routes
2. Edit `js/app.js` for frontend UI
3. Restart servers to apply changes

---

## Next Steps

1. Copy and run Terminal 1 commands to start backend
2. Copy and run Terminal 2 commands to start frontend
3. Open http://localhost:8000 in your browser
4. Register a test account and explore!

---

## Support

For issues, check:
- Browser console (F12) for client errors
- Terminal output for server errors
- `.env` file for configuration

Happy coding! 🚀
