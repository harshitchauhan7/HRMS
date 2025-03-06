import React, { useState, useEffect } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./HrCss.css"; 
import { useNavigate } from "react-router-dom";

const HRDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null); // Store logged-in user's role

    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        email: "",
        password: "",
        aadhaar: "",
        pan: "",
        accountNumber: "",
        ifscCode: "",
        emergencyContact: "",
        address: "",
        profilePicture: null,
        role: "employee"  // Default role as employee
    });

    // Fetch Employees & Check User Role
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/employees/me", {
                    withCredentials: true, // ✅ Send cookies with request
                });

                setUserRole(response.data.role);

                if (response.data.role !== "HR") {
                    alert("Access denied! Only HR can access this dashboard.");
                    navigate("/");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                navigate("/login");
            }
        };

        fetchUserData();

        axios.get("http://localhost:5000/api/employees", { withCredentials: true })
            .then(response => setEmployees(response.data))
            .catch(error => console.error("Error fetching employees:", error));
    }, [navigate]);

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle File Upload
    const handleFileChange = (e) => {
        setFormData({ ...formData, profilePicture: e.target.files[0] });
    };

    // Check-In Function
    const handleCheckIn = async (employeeId) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/attendance/check-in`, 
                { employeeId }, 
                { withCredentials: true } // ✅ Ensure cookies are sent
            );
            alert(response.data.message);
        } catch (error) {
            console.error("Error checking in:", error.response ? error.response.data : error);
            alert("Failed to check in");
        }
    };

    // Submit Form (Only HR can add employees)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        
        // Ensure proper casing for role
        const formattedRole = formData.role.charAt(0).toUpperCase() + formData.role.slice(1).toLowerCase();
    
        Object.keys(formData).forEach(key => {
            if (key === "profilePicture" && formData.profilePicture) {
                data.append("profilePicture", formData.profilePicture);
            } else if (key === "role") {
                data.append("role", formattedRole);  // Convert role to proper case
            } else {
                data.append(key, formData[key]);
            }
        });
    
        try {
            console.log("Submitting form data:", formData);
            const response = await axios.post("http://localhost:5000/api/employees/register", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
    
            alert("Employee added successfully!");
            setEmployees([...employees, response.data.employee]);
    
            setFormData({
                name: "",
                contact: "",
                email: "",
                password: "",
                aadhaar: "",
                pan: "",
                accountNumber: "",
                ifscCode: "",
                emergencyContact: "",
                address: "",
                profilePicture: null,
                role: "employee"
            });
    
            navigate("/"); 
        } catch (error) {
            console.error("Error adding employee:", error.response ? error.response.data : error);
            alert("Failed to add employee");
        }
    };
    

    return (
        <div className="container">
            <h2>HR Employee Management</h2>

            {/* Employee Form - Only HR Can See This */}
            {userRole === "HR" && (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <i className="fas fa-user"></i>
                        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <i className="fas fa-phone"></i>
                        <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <i className="fas fa-lock"></i>
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <i className="fas fa-id-card"></i>
                        <input type="text" name="aadhaar" placeholder="Aadhaar" value={formData.aadhaar} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <i className="fas fa-credit-card"></i>
                        <input type="text" name="pan" placeholder="PAN" value={formData.pan} onChange={handleChange} required />
                    </div>

                    {/* Bank Account Number */}
                    <div className="form-group">
                        <i className="fas fa-university"></i>
                        <input type="text" name="accountNumber" placeholder="Account Number" value={formData.accountNumber} onChange={handleChange} required />
                    </div>

                    {/* IFSC Code */}
                    <div className="form-group">
                        <i className="fas fa-code"></i>
                        <input type="text" name="ifscCode" placeholder="IFSC Code" value={formData.ifscCode} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <i className="fas fa-phone-alt"></i>
                        <input type="text" name="emergencyContact" placeholder="Emergency Contact" value={formData.emergencyContact} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <i className="fas fa-map-marker-alt"></i>
                        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <i className="fas fa-camera"></i>
                        <input type="file" name="profilePicture" onChange={handleFileChange} accept="image/*" required />
                    </div>

                    {/* Role Selection */}
                    <div className="form-group">
                        <label>Role:</label>
                        <select name="role" value={formData.role} onChange={handleChange}>
                            <option value="Employee">Employee</option>
                            <option value="HR">HR</option>
                        </select>
                    </div>

                    <button type="submit">Add Employee</button>
                </form>
            )}

            {/* Employee List */}
           
        </div>
    );
};

export default HRDashboard;
