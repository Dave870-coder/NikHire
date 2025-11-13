# Nikhire - Campus Recruitment System

A comprehensive web-based campus recruitment platform that connects students with job opportunities and employers with talent.

## Features

- **User Authentication**: Register and login with email/password
- **Job Listings**: View available job opportunities
- **Job Applications**: Apply for jobs and track application status
- **Student Profiles**: Create and manage student profiles with institution and occupation details
- **Task Management**: Admins can assign tasks to students
- **Admin Dashboard**: Full administrative control over jobs, tasks, and users
- **Multiple Institutions**: Support for Nigerian universities and institutions
- **Responsive Design**: Built with Tailwind CSS for responsive layout

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Tailwind CSS
- **Database**: Browser LocalStorage (MockDatabase)
- **Architecture**: Single Page Application (SPA)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Dave870-coder/NikHire.git
```

2. Navigate to the project directory:
```bash
cd NikHire
```

3. Open `index.html` in a web browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js with http-server
npx http-server
```

4. Access the application at `http://localhost:8000`

## Default Credentials

To test the admin functionality, you can:
1. Register a new user with role 'student'
2. For admin access, manually modify the user object in browser localStorage and change `role` to `admin`

## Project Structure

```
NikHire/
├── index.html
├── js/
│   └── app.js
├── README.md
└── package.json
```

## Features Breakdown

### Student Features
- Register and login
- View available jobs
- Apply for jobs
- Track application status
- Update profile (institution, occupation, profile image)
- View assigned tasks
- Add new institutions to the system

### Admin Features
- View all users
- View all applications
- Create and manage job postings
- Assign tasks to students
- Monitor system activity

## Data Persistence

The application uses browser's localStorage to persist data. All data is stored locally and will be cleared if browser storage is cleared.

## Future Enhancements

- Backend API integration
- Database integration (MongoDB, PostgreSQL)
- Email notifications
- Resume upload functionality
- Interview scheduling
- Advanced search and filtering
- User roles expansion
- Analytics dashboard

## Contributing

Feel free to fork the repository and submit pull requests for any improvements.

## License

This project is open source and available under the MIT License.

## Contact

For inquiries or support, contact the development team.
