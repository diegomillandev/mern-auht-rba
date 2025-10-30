import User from "../models/User.js";
import catchErrors from "../utils/catchErrors.js";

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
        const userId = req.params.id;
    });
}