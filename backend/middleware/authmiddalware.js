const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
    const token = req.cookies.token; // 🔹 Read token from cookies
    if (!token) return res.status(401).json({ error: "Access Denied. No token provided." });

    try { 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
};

exports.authorizeRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ error: "Access Denied. Insufficient permissions." });
    }
    next();
};
