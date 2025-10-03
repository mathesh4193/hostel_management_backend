import express from 'express';
import Leave from '../models/Leave.js';

const router = express.Router();

// 🔹 Create a leave request (Student)
router.post('/', async (req, res) => {
  try {
    const { rollno, leaveType, reason, startDate, endDate, address } = req.body;

    if (!rollno || !leaveType || !reason || !startDate || !endDate || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const leave = new Leave({ rollno, leaveType, reason, startDate, endDate, address });
    const savedLeave = await leave.save();
    res.status(201).json(savedLeave);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔹 Get leaves (Student: by rollno, Warden: all)
router.get('/', async (req, res) => {
  try {
    const { rollno } = req.query;
    const filter = rollno ? { rollno } : {};
    const leaves = await Leave.find(filter).sort({ appliedOn: -1 });
    res.json(leaves);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔹 Update leave status (Warden)
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: 'Status is required' });

    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: 'Leave not found' });

    leave.status = status;
    const updatedLeave = await leave.save();
    res.json(updatedLeave);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔹 Delete leave (Student)
router.delete('/:id', async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);
    if (!leave) return res.status(404).json({ message: 'Leave not found' });
    res.json({ message: 'Leave deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
