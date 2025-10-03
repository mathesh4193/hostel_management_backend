import mongoose from 'mongoose';

const outpassSchema = new mongoose.Schema({
  rollNo: { type: String, required: true },
  studentName: { type: String, required: true },
  roomNo: { type: String, required: true },
  destination: { type: String, required: true },
  purpose: { type: String, required: true },
  departureTime: { type: Date, required: true },
  returnTime: { type: Date, required: true },
  emergencyContact: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('Outpass', outpassSchema);
