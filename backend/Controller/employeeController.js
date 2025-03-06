const Employee = require("../modals/employeeModa");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Ensure a default HR user exists
// const createAdmin = async () => {


//     const admin = new Employee({
//         name: "Default HR",
//         contact: "9876543210",
//         email: "admin11111@company.com",
//         password:"ujjwal", // Correctly hashed password
//         aadhaar: "12314511612321789012",
//         pan: "ABCDE12111121234F",
//         accountNumber: "12341567890",
//         ifscCode: "SBIN0001234",
//         emergencyContact: "9876543211",
//         address: "Head Office",
//         profilePicture: "",
//         role: "HR",
//     });

//     await admin.save();
//     console.log("✅ Admin HR created successfully!");
    
// };

// createAdmin();
// Create Employee
exports.createEmployee = async (req, res) => {
    try {
        const { name, contact, email, password, aadhaar, pan, accountNumber, ifscCode, emergencyContact, address, role } = req.body;
        const profilePicture = req.file ? req.file.path : "";

        // Ensure role is either HR or Employee
        const validRoles = ["HR", "Employee"];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role. Role must be 'HR' or 'Employee'." });
        }

        // Check if HR already exists (only one HR allowed)
        if (role === "HR") {
            const existingHR = await Employee.findOne({ role: "HR" });
            if (existingHR) {
                return res.status(400).json({ message: "An HR user already exists!" });
            }
        }

        // Hash password before saving
        

        const newEmployee = new Employee({
            name,
            contact,
            email,
            password, // Store hashed password
            aadhaar,
            pan,
            accountNumber,
            ifscCode,
            emergencyContact,
            address,
            profilePicture,
            role: role || "Employee",
        });

        await newEmployee.save();
        res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};




// Login Controller
exports.loginEmployee = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Fetch employee with password
        const employee = await Employee.findOne({ email }).select("+password");
        if (!employee) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        console.log("✅ Employee found:", employee);
        console.log("🔹 Entered Password:", password);
        console.log("🔹 Stored Hash:", employee.password);

        // Compare passwords
        const isMatch = await bcrypt.compare(password, employee.password);
        console.log("🔹 Password Match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: employee._id, role: employee.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only secure in production
            sameSite: "lax",
            maxAge:  10 * 60 * 1000, // 1 day
        });

        res.status(200).json({
            message: "Login successful",
            token,
            role:employee.role,
            user: {
                id: employee._id,
                name: employee.name,
                email: employee.email,
                role: employee.role,
            },
        });
    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

//logout
exports.logoutEmployee = (req, res) => {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) }); // Clear cookie
    res.status(200).json({ message: "Logged out successfully" });
};


// Get All Employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//getUser Detail
exports.getUserDetails = async (req, res) => {
    try {
        const user = await Employee.findById(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ id: user._id, name: user.name, role: user.role });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Get Employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
    try {
        const { name, contact, email, aadhaar, pan, bankDetails, emergencyContact, address } = req.body;
        const profilePicture = req.file ? req.file.path : undefined;

        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            { name, contact, email, aadhaar, pan, bankDetails, emergencyContact, address, ...(profilePicture && { profilePicture }) },
            { new: true }
        );

        if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });
        res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) return res.status(404).json({ message: "Employee not found" });
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
