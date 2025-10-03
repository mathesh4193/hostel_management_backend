import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
  rollno: { type: String, required: true },
  leaveType: { type: String, required: true },
  reason: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  address: { type: String, required: true },
  status: { type: String, default: 'pending' },
  appliedOn: { type: Date, default: Date.now }
});

export default mongoose.model('Leave', leaveSchema);
