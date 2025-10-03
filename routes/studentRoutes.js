import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ students });
  } catch (err) {
    res.status(500).json({ message: "Error fetching students", error: err.message });
  }
});

// Add student
router.post("/", async (req, res) => {
  try {
    console.log("📩 Received from frontend:", req.body);

    // Map frontend keys exactly to schema
    const studentData = {
      name: req.body.name,
      rollNo: req.body.rollNo,  // matches schema
      regNo: req.body.regNo,
      roomNo: req.body.roomNo,
      department: req.body.department,
      year: req.body.year,
      address: req.body.address,
      contact: req.body.contact,
      parentContact: req.body.parentContact
    };

    const student = new Student(studentData);
    await student.save();

    res.json({ message: "Student added successfully!" });
  } catch (err) {
    console.error(err);
    // Handle duplicate key errors
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyPattern)[0];
      return res.status(400).json({ message: `Student with this ${duplicateField} already exists!` });
    }
    res.status(500).json({ message: "Error adding student", error: err });
  }
});

export default router;
