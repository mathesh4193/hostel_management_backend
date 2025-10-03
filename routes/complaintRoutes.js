// routes/complaintRoutes.js
import express from "express";
import Complaint from "../models/Complaint.js";

const router = express.Router();

// Create complaint (Student)
router.post("/", async (req, res) => {
  try {
    const { name, rollno, roomNo, category, subject, description } = req.body;
    if (!name || !rollno || !roomNo || !category || !subject || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const complaint = new Complaint({ name, rollno, roomNo, category, subject, description });
    await complaint.save();
    res.status(201).json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get student complaints by rollno
router.get("/", async (req, res) => {
  try {
    const { rollno } = req.query;
    if (!rollno) return res.status(400).json({ message: "Rollno required" });

    const complaints = await Complaint.find({ rollno }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all complaints (Warden)
router.get("/all", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update complaint status (Warden)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const complaint = await Complaint.findById(id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    complaint.status = status;
    await complaint.save();
    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
