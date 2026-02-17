You are a senior MERN stack architect.

Create a complete production-ready MERN stack project called "MyWox" — a University Bus Booking System.

The project must be fully functional end-to-end with minimal manual modification. 
All I should need to do after generation is:

1. Install dependencies
2. Add MongoDB connection string in .env
3. Run backend and frontend

==================================================
PROJECT REQUIREMENTS
==================================================
ROUTES
------------------------------------
There are only 2 bus routes:
1. Ameerpet
2. Jubilee Hills

Each route has:
- Total seats = 40
- Seat availability = 40 - booked seats

------------------------------------
USER FEATURES
------------------------------------
1. Register
2. Login (JWT authentication)
3. Select Route (Ameerpet / Jubilee)
4. View:
   - Total seats
   - Reserved seats
   - Available seats
5. Book a seat
6. View booking history
7. Logout

------------------------------------
ADMIN FEATURES
------------------------------------
1. Admin login
2. View all bookings
3. View seat statistics per route
4. Delete a booking
5. Dashboard page

------------------------------------
TECH STACK
------------------------------------
Frontend:
- React (Vite preferred)
- Tailwind CSS
- Axios
- React Router
- Context API for auth

Backend:
- Node.js
- Express
- MongoDB (Mongoose)
- JWT
- bcrypt
- dotenv
- cors

Database:
MongoDB with 2 main collections:
- Users
- Bookings

------------------------------------
PROJECT STRUCTURE
------------------------------------

mywox/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Booking.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── BookingHistory.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── SeatInfo.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Booking.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── bookingController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── bookingRoutes.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── server.js
│   └── package.json
│
└── README.md

------------------------------------
BACKEND LOGIC DETAILS
------------------------------------

User Model:
- name
- email (unique)
- password (hashed)
- role (user/admin)
- timestamps

Booking Model:
- user (ObjectId ref User)
- route (enum: Ameerpet, Jubilee)
- seatNumber
- bookingDate
- timestamps

Seat Availability Logic:
- Total seats per route = 40
- Count bookings for route
- Return reserved and available seats

Auth:
- Register (hash password)
- Login (generate JWT)
- Middleware to protect routes
- Role-based access for admin

Routes Needed:

POST /api/auth/register
POST /api/auth/login

GET /api/bookings/seats/:route
POST /api/bookings
GET /api/bookings/my
GET /api/bookings/all (admin only)
DELETE /api/bookings/:id (admin only)

------------------------------------
FRONTEND UI REQUIREMENTS
------------------------------------

Design must be modern and clean using Tailwind CSS.

Theme:
Primary Color: #900C3F
Dark Accent: #580e2c

Pages must include:
- Beautiful centered card layouts
- Clean navbar
- Responsive design
- Dashboard style UI
- Seat availability display box
- Book button
- Loading states
- Error handling

Booking Page:
- Dropdown to select route
- Display:
   - Total Seats: 40
   - Reserved Seats
   - Available Seats
- Book button
- After booking → redirect to Booking History

------------------------------------
AUTH FLOW
------------------------------------
1. Login stores token in localStorage
2. Axios interceptor sends token in header
3. Protected routes redirect if not authenticated
4. Admin-only pages restricted

------------------------------------
IMPORTANT REQUIREMENTS
------------------------------------

- Code must be clean and production structured
- Use async/await
- Proper error handling
- Separate controllers
- No hardcoded data except totalSeats = 40
- Create README with run instructions

------------------------------------
FINAL OUTPUT REQUIREMENT
------------------------------------

Generate:

1. All backend files
2. All frontend files
3. package.json files
4. .env example file
5. README with exact run commands

The project must run using:

Backend:
cd server
npm install
npm run dev

Frontend:
cd client
npm install
npm run dev

Make sure no placeholder logic is left incomplete.

Build this as a complete working MERN stack system.

End.