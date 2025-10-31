import { FRONTEND_URL } from "../constants/env.js";
import colors from "colors";

export const corsConfig = {
    origin: function (origin, callback) {
        const whiteList = [FRONTEND_URL];
        const isApiMode = process.argv.includes("--api");

        if (isApiMode) whiteList.push(undefined);

        if (!origin || whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(colors.red("Not allowed by CORS")));
        }

    },
    credentials: true,
}