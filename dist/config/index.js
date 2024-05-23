"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    port: process.env.PORT,
    reset_pass_link: process.env.RESET_PASS_LINK,
    emailSender: {
        email: process.env.EMAIL,
        app_pass_email: process.env.APP_PASS_EMAIL
    },
    jwt: {
        jwt_secret_access_toten: process.env.JWT_SECRET_ACCESS_TOKEN,
        expires_in_access_token: process.env.EXPIRES_IN_ACCESS_TOKEN,
        jwt_secret_refresh_token: process.env.JWT_SECRET_REFRESH_TOKEN,
        expires_in_refresh_token: process.env.EXPIRES_IN_REFRESH_TOKEN,
        reset_pass_token: process.env.RESET_PASS_TOKEN,
        reset_token_expires_in: process.env.RESET_TOKEN_EXPIRES_IN,
    },
};
