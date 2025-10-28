import mongoose from 'mongoose';
import { exit } from "node:process";
import { MONGO_URI } from '../constants/env.js';



export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(MONGO_URI)
        const message = `MongoDB connected: ${connection.host} ${connection.port}`;
        console.log(message);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        exit(1);
    }
}