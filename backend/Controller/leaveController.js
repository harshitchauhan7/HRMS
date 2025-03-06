const Leave = require("../modals/leaveSchema");
const Employee = require("../modals/employeeModa")

// 🟢 Apply for Leave
exports.applyLeave = async (req, res) => {
    try {
        const { employeeId, leaveType, startDate, endDate, reason } = req.body;

        const employee = await Employee.findById(employeeId);
        if (!employee) return res.status(404).json({ error: "Employee not found" });

        const newLeave = new Leave({ employee: employeeId, leaveType, startDate, endDate, reason });
        await newLeave.save();

        res.json({ message: "Leave applied successfully", leave: newLeave });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// 🟡 Get All Leave Requests (For HR)
exports.getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate("employee", "name _id");
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// 🟢 Approve or Reject Leave
exports.updateLeaveStatus = async (req, res) => {
    try {
        const { leaveId, status } = req.body;
        if (!["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const leave = await Leave.findByIdAndUpdate(leaveId, { status }, { new: true });
        if (!leave) return res.status(404).json({ error: "Leave request not found" });

        res.json({ message: `Leave ${status.toLowerCase()} successfully`, leave });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
