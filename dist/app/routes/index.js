"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const flat_route_1 = require("../modules/flat/flat.route");
const booking_route_1 = require("../modules/booking/booking.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/",
        route: user_route_1.userRoutes,
    },
    {
        path: "/",
        route: auth_route_1.authRoutes,
    },
    {
        path: "/",
        route: flat_route_1.flatRoutes,
    },
    {
        path: "/",
        route: booking_route_1.bookingRoutes,
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
