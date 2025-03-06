import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ApplyLeave = () => {
    const [employeeId, setEmployeeId] = useState(""); // New state for Employee ID
    const [leaveType, setLeaveType] = useState("CL");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");
    const navigate = useNavigate();

    const handleApplyLeave = async () => {
        if (!employeeId || !startDate || !endDate || !reason.trim()) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/leave/apply", {
                employeeId, // Include employeeId in request
                leaveType,
                startDate,
                endDate,
                reason
            });

            alert(response.data.message);
            navigate("/hr-leaves");
        } catch (error) {
            alert(error.response?.data?.error || "Failed to apply leave!");
        }
    };

    return (
        <div className="container">
            <h2>Apply for Leave</h2>

            <input
                type="text"
                placeholder="Enter Employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
            />

            <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                <option value="CL">Casual Leave (CL)</option>
                <option value="SL">Sick Leave (SL)</option>
                <option value="EL">Earned Leave (EL)</option>
            </select>

            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />

            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />

            <textarea
                placeholder="Reason for Leave"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
            />

            <button onClick={handleApplyLeave}>Apply</button>
        </div>
    );
};

export default ApplyLeave;
