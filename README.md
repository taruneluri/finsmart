# FinSmart

FinSmart is a modern full-stack personal finance and transaction management dashboard built with the MERN stack (MongoDB, Express, React, Node.js). It provides a clean, responsive interface for users to register, log in, review transactions, and manage their profile securely.

## Features

- **Authentication:** Secure Sign Up and Login pages using JSON Web Tokens (JWT).
- **Dashboard:** A complete dashboard interface to get an overview of finances with visualizations.
- **Transactions:** A dedicated page to view, add, and manage detailed financial transactions.
- **User Profile:** View and update your personal user profile.
- **RESTful API:** Robust backend API built with Node.js and Express to handle data securely.
- **Data Storage:** Persistent data storage using MongoDB and Mongoose.
- **Responsive Design:** Optimized for mobile, tablet, and desktop views using Tailwind CSS.

## Tech Stack

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite
- **Routing:** React Router DOM (v7)
- **Styling:** Tailwind CSS with `tailwind-merge` and `clsx`
- **Icons:** Lucide React
- **Charts/Graphs:** Recharts
- **HTTP Client:** Axios

### Backend
- **Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs for password hashing
- **Middleware:** CORS, dotenv

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or later recommended)
- `npm` or `yarn` (or `pnpm`)
- MongoDB (local or Atlas cluster)

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd finsmart
   ```

2. **Backend Setup**

   Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend` directory with your environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

   Start the backend development server:
   ```bash
   npm run server
   ```

3. **Frontend Setup**

   Open a new terminal window and navigate to the Frontend directory:
   ```bash
   cd Frontend
   npm install
   ```

   Start the frontend development server:
   ```bash
   npm run dev
   ```

4. **Access the App**

   Open your browser and navigate to `http://localhost:5173`.
