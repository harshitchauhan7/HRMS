const Payroll = require("../modals/payrollSchema");
const Attendance = require("../modals/attendenceSchema");
const Leave = require("../modals/leaveSchema");
const Employee = require("../modals/employeeModa");

exports.calculatePayroll = async (req, res) => {
    try {
        const { employeeId, baseSalary,presentDays } = req.body;

        // Validate input
        if (!employeeId || !baseSalary) {
            return res.status(400).json({ error: "Employee ID and Base Salary are required." });
        }

        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found." });
        }

        // Fetch attendance (days when employee checked out)
        // const presentDays = await Attendance.countDocuments({
        //     employee: employeeId,
        //     checkOutTime: { $ne: null },
        // });

        // Fetch approved leaves
        const leavesTaken = await Leave.countDocuments({
            employee: employeeId,
            status: "approved",
        });

        const totalDays = 30; // Assuming 30 days in a month

        console.log(`📊 Employee: ${employeeId}, Present Days: ${presentDays}, Leaves: ${leavesTaken}`);

        // Calculate salary (Handling cases where presentDays might be 0)
        const finalSalary = (Number(baseSalary) / totalDays) * presentDays ;

        console.log(`💰 Calculated Salary: ₹${finalSalary}`);

        // Check if payroll already exists for the same month & year
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        const existingPayroll = await Payroll.findOne({
            employee: employeeId,
            month: currentMonth,
            year: currentYear,
        });

        if (existingPayroll) {
            return res.status(400).json({ error: "Payroll already calculated for this month." });
        }

        // Save payroll data
        const payroll = new Payroll({
            employee: employeeId,
            baseSalary: Number(baseSalary),
            totalDays,
            presentDays,
            leavesTaken,
            finalSalary,
            month: currentMonth,
            year: currentYear,
        });

        await payroll.save();

        res.status(200).json({ message: "Payroll calculated successfully", payroll });

    } catch (error) {
        console.error("❌ Payroll Calculation Error:", error);
        res.status(500).json({ error: "Server error." });
    }
};

// Fetch Payroll Data for HR
exports.getAllPayrolls = async (req, res) => {
    try {
        const payrolls = await Payroll.find().populate("employee", "name _id role");
        res.status(200).json(payrolls);
    } catch (error) {
        console.error("❌ Error fetching payroll records:", error);
        res.status(500).json({ error: "Error fetching payroll records." });
    }
};
