const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const employeeSchema = new mongoose.Schema({
    
    name: String,
    contact: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false }, // Hide password in queries
    aadhaar: String,
    pan: String,
    accountNumber: String,
    ifscCode: String,
    emergencyContact: String,
    address: String,
    profilePicture: String,
    role: { type: String, enum: ["HR", "Employee"], default: "Employee" },
});
employeeSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Avoid rehashing

    console.log("🔹 Hashing password before saving:", this.password);
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// ✅ Method to compare passwords
employeeSchema.methods.comparePassword = async function (enteredPassword) {
    console.log("🔹 Comparing:", enteredPassword, "with stored hash:", this.password);
    return bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model("Employee", employeeSchema);
