const express = require("express");
const router = express.Router();
const { calculatePayroll, getAllPayrolls } = require("../Controller/payrollController");

router.post("/calculate", calculatePayroll);
router.get("/all", getAllPayrolls);

module.exports = router;
