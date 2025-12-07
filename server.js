import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import complaintRoutes from './routes/complaintRoutes.js';
import leaveRoutes from './routes/leaveRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import studentAuthRoutes from './routes/studentAuthRoutes.js';
import wardenAuth from './routes/wardenAuth.js';
import outpassRoutes from './routes/outpassRoutes.js';

dotenv.config();

const app = express();

//  Middleware
app.use(cors({
  origin: [
    "http://localhost:3000",                       
    "https://hostelmanagementmathesh1.netlify.app" 
  ],
  credentials: true
}));
app.use(express.json());

//  Connect MongoDB
await connectDB();

//  Routes
app.use('/api/complaints', complaintRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/students', studentRoutes);        // Student CRUD
app.use('/api/auth', studentAuthRoutes);        // Student login
app.use('/api/auth', wardenAuth);               // Warden login
app.use('/api/outpasses', outpassRoutes);

//  Test route
app.get('/', (req, res) => res.send('API is running'));

//  Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
