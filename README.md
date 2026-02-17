# MyWox - University Bus Booking System using MERN

A complete production-ready MERN stack application for booking university bus tickets. Features user registration, JWT authentication, seat booking, and admin dashboard.

## 🚀 Tech Stack

**Frontend:**
- React 18 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Context API for state management

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled

**Database:**
- MongoDB with 2 collections: Users & Bookings

## 📋 Features

### User Features
- Register and Login with JWT authentication
- View dashboard with real-time seat availability
- Book seats on 2 routes (Ameerpet, Jubilee Hills)
- View personalized booking history
- Logout

### Admin Features
- Admin login and dashboard
- View all bookings with user details
- Real-time seat statistics per route
- Delete bookings
- Progress visualization

### Bus Routes
- **Ameerpet**: 40 seats
- **Jubilee Hills**: 40 seats

## 🏗️ Project Structure

```
MyWox-React/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/         # Login, Register, Dashboard, Booking, etc.
│   │   ├── components/    # Navbar, SeatInfo
│   │   ├── context/       # AuthContext for auth state
│   │   ├── utils/         # API client with interceptors
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── server/                # Backend (Node + Express)
    ├── models/            # User, Booking schemas
    ├── controllers/       # Auth and Booking logic
    ├── routes/            # API endpoints
    ├── middleware/        # Auth middleware
    ├── config/            # Database config
    ├── server.js
    ├── .env.example
    └── package.json
```

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas connection)
- npm or yarn

### Step 1: Backend Setup

```bash
cd server
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your MongoDB connection string
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mywox
# JWT_SECRET=your_secret_key

# Start backend server
npm run dev
```

Backend will run on: `http://localhost:5000`

### Step 2: Frontend Setup

Open a new terminal:

```bash
cd client
npm install

# Start frontend development server
npm run dev
```

Frontend will run on: `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/validate` - Validate token (protected)

### Bookings
- `GET /api/bookings/seats/:route` - Get seat statistics
- `GET /api/bookings/available/:route` - Get available seats
- `POST /api/bookings` - Book a seat (protected)
- `GET /api/bookings/my` - Get user's bookings (protected)
- `GET /api/bookings/all` - Get all bookings (admin only)
- `DELETE /api/bookings/:id` - Delete booking (admin only)

## 🎨 UI Features

- **Modern Design**: Clean, card-based layout with Tailwind CSS
- **Responsive**: Works on mobile, tablet, and desktop
- **Real-time Updates**: Seat availability updates instantly
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Success and error alerts

## 🚀 Building for Production

### Backend:
```bash
cd server
# Set NODE_ENV=production in .env
npm start
```

### Frontend:
```bash
cd client
npm run build
# Outputs to dist/ directory
```

## 📝 Usage Workflow

1. **Register** → Create a new account
2. **Login** → Enter credentials
3. **Dashboard** → View available seats on both routes
4. **Book Seat** → Select route, choose seat, confirm booking
5. **History** → View your bookings
6. **Admin Panel** → (Admin only) Manage all bookings

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token-based authentication
- ✅ Protected API routes with middleware
- ✅ CORS enabled for secure cross-origin requests
- ✅ Environment variables for sensitive data
- ✅ Role-based access control (user/admin)


**Happy Booking! 🚌**
