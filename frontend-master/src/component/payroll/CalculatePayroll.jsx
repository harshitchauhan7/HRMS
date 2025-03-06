import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CalculatePayroll = () => {
    const [employeeId, setEmployeeId] = useState("");
    const [baseSalary, setBaseSalary] = useState("");
    const [totalDays, setTotalDays] = useState(30); // Default total days in a month
    const [presentDays, setPresentDays] = useState("");
    const [calculatedSalary, setCalculatedSalary] = useState(null);
    const navigate = useNavigate();

    const handlePayrollCalculation = async () => {
        if (!employeeId || !baseSalary || !presentDays) {
            alert("Please fill all fields!");
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:5000/api/payroll/calculate", {
                employeeId,
                baseSalary: Number(baseSalary),
                totalDays,
                presentDays: Number(presentDays),
            });
    
            console.log("Payroll Response:", response.data); // Debugging
    
            // Ensure calculatedSalary is valid before setting it
            if (response.data && typeof response.data.calculatedSalary === "number") {
                setCalculatedSalary(response.data.calculatedSalary);
            } else {
                setCalculatedSalary(null); // Handle case where salary is missing
            }
    
            alert("Payroll calculated successfully!");
            navigate("/payroll-status");
    
        } catch (error) {
            console.error("Payroll calculation error:", error);
            alert("Payroll calculation failed! " + (error.response?.data?.message || ""));
        }
    };
    

    return (
        <div className="container">
            <h2>Calculate Payroll</h2>

            <input
                type="text"
                placeholder="Enter Employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
            />

            <input
                type="number"
                placeholder="Enter Base Salary"
                value={baseSalary}
                onChange={(e) => setBaseSalary(e.target.value)}
            />

            <input
                type="number"
                placeholder="Enter Present Days"
                value={presentDays}
                onChange={(e) => setPresentDays(e.target.value)}
            />

            <button onClick={handlePayrollCalculation}>Calculate</button>

            {calculatedSalary !== null && (
                <p>Calculated Salary: <strong>₹{calculatedSalary.toFixed(2)}</strong></p>
            )}
        </div>
    );
};

export default CalculatePayroll;
