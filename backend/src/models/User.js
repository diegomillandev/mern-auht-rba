import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

userSchema.beforeSave(function (next) {
    // Hash password before saving (implementation not shown)
    next();
});


const User = mongoose.model('User', userSchema);
export default User;