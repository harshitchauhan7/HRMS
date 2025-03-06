import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EmployeeHRDetails.css";

const EmployeeHRDetails = () => {
    const [employees, setEmployees] = useState([]);
    const [hrDetails, setHrDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigation

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/employees");
                const data = response.data;

                // Separate HR and employees
                const hr = data.find((emp) => emp.role === "HR");
                const employeeList = data.filter((emp) => emp.role !== "HR");

                setHrDetails(hr);
                setEmployees(employeeList);
            } catch (err) {
                setError("Failed to fetch employee data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="container">
            <h2>HR Details</h2>
            {hrDetails ? (
                <div className="card hr-card">
                    <p><strong>Name:</strong> {hrDetails.name}</p>
                    <p><strong>Email:</strong> {hrDetails.email}</p>
                    <p><strong>Contact:</strong> {hrDetails.contact}</p>
                    <p><strong>Role:</strong> {hrDetails.role}</p>
                </div>
            ) : (
                <p>No HR found.</p>
            )}

            <h2>Employee Details</h2>
            <div className="employee-list">
                {employees.length > 0 ? (
                    employees.map((emp) => (
                        <div key={emp._id} className="card employee-card">
                            <p><strong>Name:</strong> {emp.name}</p>
                            <p><strong>Email:</strong> {emp.email}</p>
                            <p><strong>Contact:</strong> {emp.contact}</p>
                            <p><strong>Role:</strong> {emp.role}</p>
                        </div>
                    ))
                ) : (
                    <p>No employees found.</p>
                )}
            </div>

            {/* Back to Home Button */}
            <button className="home-button" onClick={() => navigate("/")}>
                Back to Home
            </button>
        </div>
    );
};

export default EmployeeHRDetails;
