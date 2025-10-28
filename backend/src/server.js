import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';

connectDB();

const app = express();

export default app;