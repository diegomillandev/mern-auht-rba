import mongoose from 'mongoose';
import { exit } from "node:process";
import { MONGO_URI } from '../constants/env.js';
import colors from 'colors';


export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(MONGO_URI)
        const message = colors.cyan(`MongoDB connected: ${connection.host} ${connection.port}`);
        console.log(message);
    } catch (error) {
        // console.error(error);
        console.error(colors.bgRed.white('Error connecting to MongoDB:' + error.message));
        exit(1);
    }
}