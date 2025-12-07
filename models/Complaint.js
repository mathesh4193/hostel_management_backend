import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rollno: { type: String, required: true },
    roomNo: { type: String, required: true },
    category: { type: String, required: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;
