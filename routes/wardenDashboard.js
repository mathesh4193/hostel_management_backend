import express from 'express';
import Student from '../models/Student.js';
import Leave from '../models/Leave.js';
import Complaint from '../models/Complaint.js';
import Room from '../models/Room.js';

const router = express.Router();

// GET /api/warden/dashboard-stats
router.get('/dashboard-stats', async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const pendingLeaves = await Leave.countDocuments({ status: 'Pending' });
    const activeComplaints = await Complaint.countDocuments({ status: { $in: ['Pending', 'In Progress'] } });
    const roomsOccupied = await Room.countDocuments({ occupied: true });

    res.json({ totalStudents, pendingLeaves, activeComplaints, roomsOccupied });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
