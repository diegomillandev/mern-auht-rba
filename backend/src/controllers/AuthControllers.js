import catchErrors from "../utils/catchErrors.js";
import { registerSchema, loginSchema } from "../schemas/auth.js";
import { formatZodError } from "../utils/helpers.js";
import { comparePassword } from '../utils/bycript.js';
import User from "../models/User.js";

export class AuthController {
    static register = catchErrors(async (req, res) => {

        const result = registerSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ errors: formatZodError(result.error) });
        }

        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ errors: { email: "Email is already registered" } });
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

        res.status(200).json({ message: "Login successful" });
    });
}