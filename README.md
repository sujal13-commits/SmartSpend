# SmartSpend 💰

A full-stack MERN expense tracker with authentication, category-wise spending visualization, and secure password recovery — built from scratch and deployed live.

**🔗 Live App:** [smart-spend-peach.vercel.app](https://smart-spend-peach.vercel.app)
**🔗 Backend API:** [smartspend-j02p.onrender.com](https://smartspend-j02p.onrender.com)

> ⚠️ Backend is hosted on Render's free tier, which spins down after periods of inactivity. The first request may take 30-50 seconds to respond while the server wakes up.

---

## Features

- **Authentication** — Secure signup/login with JWT tokens and bcrypt password hashing
- **Expense Management** — Full CRUD: add, view, edit, and delete expenses
- **Category-wise Visualization** — Interactive pie chart showing spending breakdown by category (Recharts)
- **Password Recovery** — Forgot password flow with time-limited reset tokens sent via email (Resend API)
- **Protected Routes** — Backend middleware ensures users can only access their own data
- **Responsive UI** — Clean, mobile-friendly interface built with Tailwind CSS

---

## Tech Stack

**Frontend:** React (Vite), Tailwind CSS, React Router, Axios, Recharts, React Hot Toast
**Backend:** Node.js, Express.js, JWT, bcrypt.js
**Database:** MongoDB Atlas (Mongoose ODM)
**Email:** Resend API
**Deployment:** Vercel (frontend) · Render (backend) · MongoDB Atlas (database)

---

## Screenshots

<img width="1917" height="857" alt="image" src="https://github.com/user-attachments/assets/b0ed0b0d-4fe6-4c91-aeca-0dc1ecbd1f16" />
<img width="1892" height="841" alt="Screenshot 2026-08-05 034117" src="https://github.com/user-attachments/assets/a6f3f297-f8e0-4b2f-ae7c-c63bc65b3435" />
<img width="1890" height="807" alt="image" src="https://github.com/user-attachments/assets/ba2db3a8-b355-4bdf-b4fc-1267fb52024b" />

---

## Architecture

```
[React Frontend]  <--- HTTP requests (axios) --->  [Express Backend]  <--- Mongoose --->  [MongoDB Atlas]
     (Vercel)                                          (Render)
```

- **Frontend** handles UI, routing, and state management, communicating with the backend via REST API calls
- **Backend** validates JWT tokens on protected routes, applies business logic, and interacts with MongoDB
- **Database** stores users and expenses, with every expense scoped to its owning user

---

## Getting Started (Run Locally)

### Prerequisites
- Node.js (LTS)
- A MongoDB Atlas account (free tier)
- A Resend account (free tier) for email functionality

### 1. Clone the repository
```bash
git clone https://github.com/sujal13-commits/SmartSpend.git
cd SmartSpend
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:
```
MONGO_URI=mongodb+srv://sujal:sujal123@cluster0.hs7zdxd.mongodb.net/smartspend?appName=Cluster0
JWT_SECRET=x7Kp9mQ2vL4nR8tY3wZ6bC1dF5gH0jN
PORT=5000
RESEND_API_KEY=your_resend_api_key
FRONTEND_URL=http://localhost:5173
```

Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|----------------|
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/login` | Log in and receive JWT | No |
| POST | `/api/auth/forgot-password` | Request password reset link | No |
| PUT | `/api/auth/reset-password/:token` | Reset password using token | No |
| GET | `/api/expenses` | Get all expenses for logged-in user | Yes |
| POST | `/api/expenses` | Add a new expense | Yes |
| PUT | `/api/expenses/:id` | Update an expense | Yes |
| DELETE | `/api/expenses/:id` | Delete an expense | Yes |

---

## What I Learned Building This

- Designing and securing a REST API with JWT-based authentication and middleware-protected routes
- Structuring a MERN app with clean separation of concerns (models, controllers, routes, middleware)
- Debugging real-world cloud deployment issues, including an IPv6/SMTP connectivity problem on Render that required switching from Gmail SMTP to a dedicated email API (Resend)
- Deploying a full-stack app across multiple platforms (Vercel, Render, MongoDB Atlas) and managing environment variables and CORS across environments
- Building data visualizations by aggregating and transforming API data on the frontend

---

## Author

**Sujal Pagade**
[LinkedIn](#) · [GitHub](https://github.com/sujal13-commits)
