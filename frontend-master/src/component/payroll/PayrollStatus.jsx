import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Payroll.css"; // Add styles as needed

const PayrollStatus = () => {
    const [payrolls, setPayrolls] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/payroll/all")
            .then(response => setPayrolls(response.data))
            .catch(error => console.error("Error fetching payroll data:", error));
    }, []);

    return (
        <div className="container">
            <h2>Payroll Status</h2>

            <table className="payroll-table">
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Base Salary</th>
                        <th>Present Days</th>
                        <th>Leaves Taken</th>
                        <th>Final Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {payrolls.map((pay) => (
                        <tr key={pay._id}>
                            <td>{pay.employee.name}</td>
                            <td>${pay.baseSalary}</td>
                            <td>{pay.presentDays}</td>
                            <td>{pay.leavesTaken}</td>
                            <td>${pay.finalSalary.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PayrollStatus;
