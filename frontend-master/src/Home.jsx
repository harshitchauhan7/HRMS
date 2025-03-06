import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css"; // Import CSS module

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1>Welcome to HR Management System</h1>
            

            <div className={styles.buttonContainer}>
                {/* HR Section */}
                <div className={styles.column}>
                    <h2>HR Actions</h2>
                    <button className={styles.button} onClick={() => navigate("/hr-dashboard")}>
                        HR Dashboard
                    </button>
                    <button className={styles.button} onClick={() => navigate("/register")}>
                        Register Employee
                    </button>
                    <button className={styles.button} onClick={() => navigate("/attendence")}>
                        View Attendance
                    </button>
                    <button className={styles.button} onClick={() => navigate("/hr-leaves")}>
                        Approve Leave Requests
                    </button>
                    <button className={styles.button} onClick={() => navigate("/payroll-status")}>
                        Payroll Status
                    </button>
                    <button className={styles.button} onClick={() => navigate("/calculate-payroll")}>
                        Calculate Payroll
                    </button>
                </div>

                {/* Employee Section */}
                <div className={styles.column}>
                    <h2>Employee Actions</h2>
                    <button className={styles.button} onClick={() => navigate("/employee")}>
                        Check-in/Out
                    </button>
                    <button className={styles.button} onClick={() => navigate("/apply-leave")}>
                        Apply Leave
                    </button>
                </div>
            </div>

            {/* Logout Button - Positioned at the Bottom */}
            <div className={styles.logoutWrapper}>
                <button className={styles.logoutButton} onClick={() => navigate("/logout")}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Home;
