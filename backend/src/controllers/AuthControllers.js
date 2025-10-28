import catchErrors from "../utils/catchErrors.js";
import { registerSchema } from "../schemas/auth.js";
import { formatZodError } from "../utils/helpers.js";
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
}