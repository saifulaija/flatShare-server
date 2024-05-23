"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
// import cookieParser from 'cookie-parser'
// import globalErrorhandler from "./app/middlewares/globalErrorHandler";
// import notFounRoute from "./app/middlewares/notFoundRoute";
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// app.use(cookieParser())
//parser
app.use(express_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send({
        message: " Flat share server",
    });
});
app.use("/api", routes_1.default);
app.use(globalErrorHandler_1.default);
// app.use(notFounRoute)
exports.default = app;
