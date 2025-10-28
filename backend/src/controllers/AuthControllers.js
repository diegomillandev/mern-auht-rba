import catchErrors from "../utils/catchErrors.js";


export class AuthController {
    static register = catchErrors(async (req, res) => {
        console.log("Register endpoint hit");
    });
}