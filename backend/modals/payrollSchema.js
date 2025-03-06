const mongoose = require("mongoose");

const PayrollSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    baseSalary: {
        type: Number,
        required: true,
    },
    totalDays: {
        type: Number,
        default: 30, // Assuming a 30-day month
    },
    presentDays: {
        type: Number,
        required: true,
    },
    leavesTaken: {
        type: Number,
        required: true,
    },
    finalSalary: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Payroll", PayrollSchema);
