import React, { useState } from "react";
import axios from "axios";
import "./EmployeeCheckInOut.css"; // Add styling if needed

const EmployeeCheckInOut = () => {
    const [employeeId, setEmployeeId] = useState("");
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    // ✅ Handle Check-In
    const handleCheckIn = async () => {
        if (!employeeId) return alert("Please enter your Employee ID");

        setLoading(true);
        try {
            await axios.post("http://localhost:5000/api/attendance/check-in", { employeeId });
            setIsCheckedIn(true);
            alert("Check-in successful!");
        } catch (error) {
            alert(error.response?.data?.error || "Check-in failed");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Handle Check-Out
    const handleCheckOut = async () => {
        if (!employeeId) return alert("Please enter your Employee ID");

        setLoading(true);
        try {
            await axios.post("http://localhost:5000/api/attendance/check-out", { employeeId });
            setIsCheckedIn(false);
            alert("Check-out successful!");
        } catch (error) {
            alert(error.response?.data?.error || "Check-out failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkin-container">
            <h2>Employee Attendance</h2>
            
            <input
                type="text"
                placeholder="Enter Employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="employee-input"
            />

            <p>Status: <strong>{isCheckedIn ? "Checked-In" : "Checked-Out"}</strong></p>

            <div className="button-group">
                <button 
                    onClick={handleCheckIn} 
                    disabled={isCheckedIn || loading} 
                    className="checkin-btn"
                >
                    {loading ? "Checking In..." : "Check In"}
                </button>
                <button 
                    onClick={handleCheckOut} 
                    disabled={!isCheckedIn || loading} 
                    className="checkout-btn"
                >
                    {loading ? "Checking Out..." : "Check Out"}
                </button>
            </div>
        </div>
    );
};

export default EmployeeCheckInOut;
