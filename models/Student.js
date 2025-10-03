import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
    unique: true,
  },
  regNo: {
    type: String,
    required: true,
    unique: true,
  },
  roomNo: String,
  department: String,
  year: String,
  address: String,
  contact: String,
  parentContact: String,
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
