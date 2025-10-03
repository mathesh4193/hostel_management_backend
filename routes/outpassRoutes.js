import express from 'express';
import Outpass from '../models/Outpass.js';
import QRCode from 'qrcode';

const router = express.Router();

// 🔹 Create a new outpass (Student)
router.post('/', async (req, res) => {
  try {
    const {
      rollNo, studentName, roomNo,
      destination, purpose, departureTime,
      returnTime, emergencyContact
    } = req.body;

    if (!rollNo || !studentName || !roomNo || !destination || !purpose || !departureTime || !returnTime || !emergencyContact) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newOutpass = new Outpass({
      rollNo, studentName, roomNo,
      destination, purpose, departureTime,
      returnTime, emergencyContact
    });

    const savedOutpass = await newOutpass.save();
    res.status(201).json(savedOutpass);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔹 Get outpasses (Student: by rollNo, Warden: all)
router.get('/', async (req, res) => {
  try {
    const { rollNo } = req.query;
    const filter = rollNo ? { rollNo } : {};
    const outpasses = await Outpass.find(filter).sort({ createdAt: -1 });
    res.json(outpasses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔹 Update status (Warden: approve/reject + QR generation)
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: 'Status is required' });

    const outpass = await Outpass.findById(req.params.id);
    if (!outpass) return res.status(404).json({ message: 'Outpass not found' });

    outpass.status = status;

    // QR only generated if Approved
    if (status === 'Approved') {
      const qrData = JSON.stringify({
        rollNo: outpass.rollNo,
        studentName: outpass.studentName,
        departureTime: outpass.departureTime,
        returnTime: outpass.returnTime,
        status
      });
      outpass.qrCode = await QRCode.toDataURL(qrData);
    } else {
      outpass.qrCode = null; // Remove QR for Rejected
    }

    await outpass.save();
    res.json(outpass);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/outpasses
router.get('/', async (req, res) => {
  try {
    const { rollNo } = req.query; // optional query param
    if (!rollNo) return res.status(400).json({ message: 'rollNo is required' });

    const outpasses = await Outpass.find({ rollNo }).sort({ createdAt: -1 });
    res.json(outpasses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
