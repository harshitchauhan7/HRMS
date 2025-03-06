import React, { useState, useEffect } from "react";
import axios from "axios";

const HRLeaveManagement = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/leave/all")
            .then(response => setLeaveRequests(response.data))
            .catch(error => console.error("Error fetching leaves:", error));
    }, []);

    const handleLeaveAction = async (leaveId, status) => {
        try {
            await axios.put("http://localhost:5000/api/leave/update", { leaveId, status });
            alert(`Leave ${status.toLowerCase()} successfully`);
            setLeaveRequests(prev => prev.filter(leave => leave._id !== leaveId));
        } catch (error) {
            alert("Action failed!");
        }
    };

    return (
        <div className="container">
            <h2>HR - Manage Leave Requests</h2>
            <table>
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Leave Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveRequests.map(leave => (
                        <tr key={leave._id}>
                            <td>{leave.employee.name}</td>
                            <td>{leave.leaveType}</td>
                            <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                            <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                            <td>{leave.status}</td>
                            <td>
                                {leave.status === "Pending" && (
                                    <>
                                        <button onClick={() => handleLeaveAction(leave._id, "Approved")}>Approve</button>
                                        <button onClick={() => handleLeaveAction(leave._id, "Rejected")}>Reject</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HRLeaveManagement;
