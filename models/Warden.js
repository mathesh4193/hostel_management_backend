import mongoose from 'mongoose';

const wardenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: String,
});

const Warden = mongoose.model('Warden', wardenSchema);
export default Warden;
