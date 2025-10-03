// routes/studentAuth.js
import express from 'express';
import Student from '../models/Student.js';

const router = express.Router();

// Student login route
router.post('/student-login', async (req, res) => {
  const { rollNo, regNo } = req.body;

  if (!rollNo || !regNo) {
    return res.status(400).json({ message: "rollNo and regNo are required" });
  }

  const student = await Student.findOne({ rollNo });
  if (!student || student.regNo !== regNo) {
    return res.status(401).json({ message: "Invalid roll number or registration number" });
  }

  res.json({
    message: "Login successful",
    student: {
      id: student._id,
      name: student.name,
      rollNo: student.rollNo,
      roomNo: student.roomNo,
      department: student.department,
      year: student.year
    }
  });
});

export default router;
