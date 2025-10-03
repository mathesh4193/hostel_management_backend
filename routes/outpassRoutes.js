import express from 'express';
import Outpass from '../models/Outpass.js';
const router = express.Router();

// 1️⃣ Get Outpasses
// Student: rollNo query parameter
// Warden: no query => get all
router.get('/', async (req, res) => {
  try {
    const { rollNo } = req.query;
    const outpasses = rollNo 
      ? await Outpass.find({ rollNo }).sort({ createdAt: -1 })
      : await Outpass.find().sort({ createdAt: -1 });
    res.json(outpasses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 2️⃣ Submit Outpass
router.post('/', async (req, res) => {
  try {
    const { rollNo, studentName, roomNo, destination, purpose, departureTime, returnTime, emergencyContact } = req.body;

    if (!rollNo || !studentName || !destination || !purpose || !departureTime || !returnTime)
      return res.status(400).json({ message: 'All required fields must be provided' });

    const newOutpass = new Outpass({
      rollNo,
      studentName,
      roomNo,
      destination,
      purpose,
      departureTime: new Date(departureTime),
      returnTime: new Date(returnTime),
      emergencyContact
    });

    const saved = await newOutpass.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit outpass' });
  }
});

// 3️⃣ Warden: Approve / Reject
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Outpass.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update status' });
  }
});

export default router;
