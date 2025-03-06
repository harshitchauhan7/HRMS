const express = require("express");
const { checkIn, checkOut,getAttendanceStatus,getAllAttendance } = require("../Controller/attendenceController");

const router = express.Router();

router.post("/check-in", checkIn);
router.post("/check-out", checkOut);
router.get("/status/:employeeId", getAttendanceStatus);
router.get("/all", getAllAttendance);


module.exports = router;
