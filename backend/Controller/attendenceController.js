const Attendance = require("../modals/attendenceSchema");
const Employee = require("../modals/employeeModa");

// Define working hours
const WORK_START_HOUR = 9;
const WORK_END_HOUR = 18;

// ✅ Check-In Function
exports.checkIn = async (req, res) => {
    try {
        const { employeeId } = req.body;

        // Validate Employee
        const employee = await Employee.findById(employeeId);
        if (!employee) return res.status(404).json({ error: "Employee not found" });

        const now = new Date();
        const hours = now.getHours();

        // ✅ Validate Check-In Time
        if (hours < WORK_START_HOUR || hours >= WORK_END_HOUR) {
            return res.status(400).json({ error: "Check-in only allowed during working hours (9 AM - 6 PM)" });
        }

        // ✅ Prevent multiple check-ins without checkout
        const existingAttendance = await Attendance.findOne({ employee: employeeId, checkOutTime: null });
        if (existingAttendance) {
            return res.status(400).json({ error: "You have already checked in. Please check out first." });
        }
          
        // ✅ Save Check-In Record
        const newAttendance = new Attendance({ employee: employeeId, checkInTime: now });
        await newAttendance.save();

        res.json({ message: "Check-in successful", attendance: newAttendance });

    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

// ✅ Check-Out Function
exports.checkOut = async (req, res) => {
    try {
        const { employeeId } = req.body;

        // Validate Employee
        const employee = await Employee.findById(employeeId);
        if (!employee) return res.status(404).json({ error: "Employee not found" });

        // ✅ Find Check-In Record
        const attendanceRecord = await Attendance.findOne({ employee: employeeId, checkOutTime: null });
        if (!attendanceRecord) {
            return res.status(400).json({ error: "No active check-in found. Please check in first." });
        }

        // ✅ Update Check-Out Time
        attendanceRecord.checkOutTime = new Date();
        await attendanceRecord.save();

        res.json({ message: "Check-out successful", attendance: attendanceRecord });

    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

// ✅ Get Employee Attendance Status
exports.getAttendanceStatus = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const attendance = await Attendance.findOne({ employee: employeeId, checkOutTime: null })
            .populate("employee", "name _id"); // Fetch employee name

        if (!attendance) {
            return res.status(404).json({ error: "No active check-in found for this employee." });
        }

        res.json({ attendance });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

// ✅ Get All Attendance Records
exports.getAllAttendance = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find()
            .populate("employee", "name _id") // Populates name & ID from Employee model
            .exec();

        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: "Error fetching attendance records", error: error.message });
    }
};
