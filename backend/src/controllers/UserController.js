import User from "../models/User.js";
import { objectIdSchema } from "../schemas/auth.js";
import catchErrors from "../utils/catchErrors.js";
import { formatZodError } from "../utils/helpers.js";

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
        const user = await User.findById(req.user.id).select('-password -__v');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    })
}