import mongoose from 'mongoose';
import { hashValue } from '../utils/bycript.js';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await hashValue(this.password);
    return next();
});


const User = mongoose.model('User', userSchema);
export default User;