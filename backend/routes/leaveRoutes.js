const express = require("express");
const { applyLeave, getAllLeaves, updateLeaveStatus } = require("../Controller/leaveController");

const router = express.Router();

router.post("/apply", applyLeave); // 🟢 Apply for Leave
router.get("/all", getAllLeaves); // 🟡 Get All Leaves (For HR)
router.put("/update", updateLeaveStatus); // 🔴 Approve/Reject Leave

module.exports = router;
