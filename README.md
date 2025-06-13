# HALF-CHAIN

A full-stack blockchain application with authentication and smart contract deployment capabilities.

## 📁 Project Structure

```
HALF-CHAIN/
├── backend/                 # Backend API Server
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Authentication & validation middleware
│   │   ├── routes/          # API routes
│   │   ├── services/        # Email and external services
│   │   ├── store/           # In-memory data storage
│   │   ├── config/          # Configuration files
│   │   └── app.js          # Express app entry point
│   ├── package.json
│   └── node_modules/
├── frontend/               # React Frontend Application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   ├── layouts/        # Layout components
│   │   ├── lib/            # Libraries and configurations
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # React entry point
│   ├── public/             # Static assets
│   ├── package.json
│   └── node_modules/
└── README.md              # This file
```

## 🚀 Quick Start

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

   The backend server will run on `http://localhost:9876`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173` (or another available port)

## 🔧 Backend Features

- **Authentication System**: JWT-based authentication with signup/signin
- **In-Memory Storage**: No database required for development
- **Session Management**: Multi-device session support
- **Email Services**: Email verification and password reset
- **Security Middleware**: Rate limiting, CORS, security headers
- **Admin Functions**: User management and system statistics

### API Endpoints

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `GET /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password
- `GET /api/auth/profile` - Get user profile
- `GET /api/auth/sessions` - Get user sessions
- `DELETE /api/auth/sessions/:token` - Revoke session

## 🎨 Frontend Features

- **React + Vite**: Modern React development setup
- **Tailwind CSS**: Utility-first CSS framework
- **Authentication UI**: Complete signup/signin/reset password flows
- **Smart Contract Forms**: Contract deployment interface
- **Responsive Design**: Mobile-first responsive design
- **Protected Routes**: Route protection based on authentication

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=9876
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=your_email@gmail.com
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:9876/api
```

## 🛠 Development

### Backend Development
- Uses **nodemon** for auto-restart on file changes
- **ES Modules** throughout the codebase
- **In-memory storage** for rapid development
- **Express.js** with security middleware

### Frontend Development
- **Vite** for fast development and building
- **React 18** with modern hooks
- **Tailwind CSS** for styling
- **React Router** for navigation

## 📦 Dependencies

### Backend
- express
- jsonwebtoken
- bcryptjs
- nodemailer
- express-validator
- helmet
- cors
- express-rate-limit

### Frontend
- react
- react-dom
- react-router-dom
- tailwindcss
- vite
- axios (for API calls)

## 🚀 Deployment

### Backend
1. Set `NODE_ENV=production`
2. Configure proper SMTP settings
3. Deploy to your preferred platform (Heroku, Railway, etc.)

### Frontend
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your preferred hosting (Vercel, Netlify, etc.)
3. Update `VITE_API_URL` to point to your production backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 