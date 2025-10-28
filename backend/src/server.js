import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import router from './routes/v1/index.js';

connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());


// API Routes
app.use('/api/v1', router)

// Error handling middleware
app.use(errorHandler)

export default app;