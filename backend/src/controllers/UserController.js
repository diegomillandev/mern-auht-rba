import User from "../models/User.js";
import { objectIdSchema, updatePasswordSchema, updateProfileSchema } from "../schemas/auth.js";
import catchErrors from "../utils/catchErrors.js";
import { formatZodError } from "../utils/helpers.js";
import { comparePassword } from "../utils/bycript.js";

export class UserController {
    static getUsers = catchErrors(async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const total = await User.countDocuments();
        const users = await User.find().skip(skip).limit(limit).select('-password');

        res.status(200).json({
            users,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    });

    static deleteUser = catchErrors(async (req, res) => {

        const result = objectIdSchema.safeParse({ id: req.params.id });
        if (!result.success) {
            return res.status(400).json({ errors: formatZodError(result.error) });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.deleteOne();

        res.status(200).json({ message: "User deleted successfully" });
    });

    static getProfile = catchErrors(async (req, res) => {
        const { password, __v, ...userData } = req.user.toObject();

        res.status(200).json({ user: userData });
    })

    static updateProfile = catchErrors(async (req, res) => {

        const result = updateProfileSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ errors: formatZodError(result.error) });
        }

        const { email, username } = result.data;


        if (req.user.role !== 'admin' && email && email !== req.user.email) {
            return res.status(403).json({ message: "You are not authorized to change your email" });
        }

        if (email) {
            const validatedEmail = await User.findOne({ email });
            if (validatedEmail && validatedEmail.id !== req.user.id) {
                return res.status(400).json({ message: "Email is already in use" });
            }
        }

        if (username) req.user.username = username;
        if (email && req.user.role === 'admin') req.user.email = email;

        await req.user.save();

        res.status(200).json({ message: "Profile updated successfully" });
    });

    static updatePassword = catchErrors(async (req, res) => {
        const result = updatePasswordSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ errors: formatZodError(result.error) });
        }

        const { current_password, new_password } = result.data;
        const isMatch = await comparePassword(current_password, req.user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        req.user.password = new_password;
        await req.user.save();

        res.status(200).json({ message: "Password updated successfully" });
    });
}