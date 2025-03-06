const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    checkInTime: {
        type: Date,
        required: true,
    },
    checkOutTime: {
        type: Date,
        default: null,
    },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
