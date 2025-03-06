import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove authentication token stored in cookies
        Cookies.remove("token");

        // Redirect to login page
        navigate("/login");
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    );
};

export default Logout;
