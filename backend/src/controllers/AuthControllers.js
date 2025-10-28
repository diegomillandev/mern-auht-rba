import catchErrors from "../utils/catchErrors.js";


export class AuthController {
    static register = catchErrors(async (req, res) => {
        console.log("Register endpoint hit");

        res.status(201).json({ message: "User registered successfully" });
    });
}