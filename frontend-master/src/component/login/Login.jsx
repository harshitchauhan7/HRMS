import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Login.css";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle login form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:5000/api/employees/login", 
                formData, 
                { withCredentials: true } // ✅ Ensure cookies are included
            );
    
            const role = response.data?.role; // ✅ Ensure role is defined
    
            if (!role) {
                throw new Error("Role not received from server"); // ✅ Handle missing role
            }
    
            alert("Login successful!");
    
            // ✅ Match exact role case
            if (role === "HR") {
                navigate("/home");
            } else if (role === "Employee") {
                navigate("/employee-dashboard");
            } else {
                throw new Error("Unknown role: " + role); // ✅ Handle unexpected roles
            }
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error);
            alert(error.response?.data?.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <i className="fas fa-envelope"></i>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                
                <div className="form-group">
                    <i className="fas fa-lock"></i>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
