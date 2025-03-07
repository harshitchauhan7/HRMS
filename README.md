# Employee Management System

This project is a full-stack **Employee Management System**, consisting of a **React.js frontend** and a **Node.js backend** with **MongoDB** as the database.

---
## 📌 Features
- **User Authentication** (Login & Logout)
- **HR Dashboard** for managing employees
- **Employee Attendance System** (Check-in/Check-out)
- **Leave Management System** (Apply & Approve Leaves)
- **Payroll Processing** (View & Calculate Salaries)

---
## 🏗 Tech Stack

### Frontend:
- **React.js** (UI)
- **React Router** (Navigation)
- **Axios** (API calls)
- **CSS Modules** (Styling)

### Backend:
- **Node.js** (Runtime)
- **Express.js** (Server)
- **MongoDBAtlas** (Database)
- **JWT** (Authentication)
- **Mongoose** (ODM for MongoDB)

---

## 🚀 Setup & Installation

### 1️⃣ Backend Setup

#### Prerequisites:
- Install **Node.js** & **MongoDB**

#### Steps:
```bash
# Clone the repository
git clone https://github.com/your-repo/employee-management.git

# Navigate to backend
d cd employee-management/backend

# Install dependencies
npm install

# Configure Environment Variables (Create .env file)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

# Start the server
npm start
```

#### API Endpoints:
| Method | Endpoint | Description |
|--------|-------------|-----------------|
| POST | `/api/auth/login` | User login |
| GET | `/api/employees` | Fetch employees |
| POST | `/api/leave/apply` | Apply for leave |
| GET | `/api/payroll/status` | Get payroll status |

---

### 2️⃣ Frontend Setup

#### Prerequisites:
- Install **Node.js** (for npm)

#### Steps:
```bash
# Navigate to frontend
d cd ../frontend

# Install dependencies
npm install

# Start the development server
npm start
```

---

## 🔥 Usage Guide
1. **Login** using credentials.
2. Navigate to **HR Dashboard** to manage employees.
3. **Employees** can Check-in/Out and Apply for Leaves.
4. **HR** can Approve Leaves & Process Payroll.

---

## 📜 License
This project is **MIT Licensed**.

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first.

---

## 📧 Contact
For inquiries, reach out to: [your-email@example.com](mailto:your-email@example.com)

---

