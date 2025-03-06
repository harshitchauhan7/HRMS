import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import HRDashboard from "./HRDashboard";
import CheckInOut from "./CheckInOut";
import EmployeeCheckInOut from "./EmployeeCheckInOut.jsx";
import ApplyLeave from "./component/leave/ApplyLeave";
import HRLeaveManagement from "./component/acceptleave/HRLeaveManagement";
import PayrollStatus from "./component/payroll/PayrollStatus.jsx";
import CalculatePayroll from "./component/payroll/CalculatePayroll.jsx";
import Login from "./component/login/Login.jsx";
import EmployeeHRDetails from "./component/employeedetail/EmployeeHRDetails.jsx";
import Logout from "./component/login/Logout.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Default route redirects to login */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                
                {/* Other Routes */}
                <Route path="/register" element={<HRDashboard />} />
                <Route path="/hr-dashboard" element={<EmployeeHRDetails />} />
                <Route path="/attendence" element={<CheckInOut />} />
                <Route path="/employee" element={<EmployeeCheckInOut />} />
                <Route path="/logout" element={<Logout />} />
                
                <Route path="/apply-leave" element={<ApplyLeave />} />
                <Route path="/hr-leaves" element={<HRLeaveManagement />} />
                <Route path="/payroll-status" element={<PayrollStatus />} />
                <Route path="/calculate-payroll" element={<CalculatePayroll />} />
            </Routes>
        </Router>
    );
};

export default App;
