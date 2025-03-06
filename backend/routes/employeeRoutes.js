// routes/employeeRoutes.js
const express = require('express');
const multer = require('multer');
const { 
    createEmployee, 
    getEmployees, 
    getEmployeeById, 
    updateEmployee, 
    deleteEmployee, 
    loginEmployee,
    logoutEmployee,
    getUserDetails
} = require('../Controller/employeeController');
const {authenticate} = require("../middleware/authmiddalware")

const router = express.Router();

// Multer setup for profile picture upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Employee Routes
router.post('/register', upload.single('profilePicture'), createEmployee);
router.post('/login',loginEmployee)
router.post("/logout", logoutEmployee);
router.get('/', getEmployees);
router.get('/me',authenticate,getUserDetails)
router.get('/:id', getEmployeeById);
router.put('/:id', upload.single('profilePicture'), updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
 