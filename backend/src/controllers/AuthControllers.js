import catchErrors from "../utils/catchErrors.js";


export class AuthControllers {
    static register = catchErrors(async (req, res) => {
        console.log("Register endpoint hit");
    });
}