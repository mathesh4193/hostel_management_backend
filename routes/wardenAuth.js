// routes/wardenAuth.js
import express from 'express';
import Warden from '../models/Warden.js';

const router = express.Router();

// Add Warden - only for testing via Postman
router.post('/add-warden', async (req, res) => {
  try {
    const { name, userId, password, department } = req.body;

    if (!name || !userId || !password || !department) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existing = await Warden.findOne({ userId });
    if (existing) {
      return res.status(400).json({ message: 'Warden with this userId already exists' });
    }

    const warden = new Warden({ name, userId, password, department });
    await warden.save();

    res.status(201).json({ message: 'Warden added successfully', warden });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Warden login route
router.post('/warden-login', async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({ message: 'userId and password are required' });
    }

    const warden = await Warden.findOne({ userId });
    if (!warden || warden.password !== password) {
      return res.status(401).json({ message: 'Invalid user ID or password' });
    }

    // Successful login
    res.json({
      message: 'Login successful',
      warden: {
        id: warden._id,
        name: warden.name,
        userId: warden.userId,
        department: warden.department,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

export default router;
