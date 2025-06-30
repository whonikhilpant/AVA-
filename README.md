# AVA CRM - Modern Office Management System

A comprehensive CRM web application built with React, TypeScript, and Node.js for efficient office management.

## Features

- **Employee Authentication**: Secure login with employee ID and password
- **Dashboard**: Real-time overview of attendance, leads, events, and email activity
- **Attendance Management**: Track and monitor employee attendance
- **Lead Management**: Organize and track potential clients
- **Event Management**: Schedule and manage office events
- **Document Management**: Centralized document storage and access
- **Email Activity Log**: Monitor email communications

## Tech Stack

### Frontend
- React 18 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- React Hook Form for form handling
- React Query for data fetching
- Recharts for data visualization
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- bcrypt for password hashing
- Nodemailer for email functionality

## Project Structure

```
ava-crm/
├── public/                 # Static assets
├── src/                    # React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API services
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── context/           # React context providers
│   └── styles/            # Global styles
├── backend/               # Node.js server
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Server utilities
│   └── config/           # Configuration files
└── docs/                 # Documentation
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   cd backend && npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Configure your environment variables
   ```

3. **Start development servers**:
   ```bash
   # Terminal 1 - Frontend
   npm start
   
   # Terminal 2 - Backend
   npm run server
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Rate limiting
- Secure session management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details 