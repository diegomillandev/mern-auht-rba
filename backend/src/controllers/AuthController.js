import catchErrors from "../utils/catchErrors.js";
import { registerSchema, loginSchema } from "../schemas/auth.js";
import { formatZodError } from "../utils/helpers.js";
import { comparePassword } from '../utils/bycript.js';
import { signTokenFn, refreshTokenFn } from "../utils/jwt.js";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";
import { JWT_REFRESH_SECRET } from "../constants/env.js";

export class AuthController {
    static register = catchErrors(async (req, res) => {

        const result = registerSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ errors: formatZodError(result.error) });
        }

        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }


        const user = await User.create({
            username,
            email,
            password
        });

        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    });

    static login = catchErrors(async (req, res) => {

        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ errors: formatZodError(result.error) });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: { email: "Invalid email or password" } });
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ errors: { email: "Invalid password" } });
        }

        const accessToken = signTokenFn(user._id, user.role);
        const refreshToken = refreshTokenFn(user._id, user.role);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(200).json({ accessToken, message: "Logged in successfully" });
    });

    static refreshToken = catchErrors(async (req, res) => {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({ message: "No refresh token provided" });
        }

        try {
            const decoded = jwt.verify(token, JWT_REFRESH_SECRET);

            const user = await User.findById(decoded.id);

            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            const newAccessToken = signTokenFn(user._id, user.role);

            res.status(200).json({ accessToken: newAccessToken });
        } catch (error) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
    });

    static logout = catchErrors(async (req, res) => {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(200).json({ message: "Logged out successfully" });
    });
}