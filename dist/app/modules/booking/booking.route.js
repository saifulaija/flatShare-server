"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/booking-applications', (0, auth_1.default)(client_1.UserRole.USER), booking_controller_1.bookingControllers.createBooking);
router.get('/booking-requests', (0, auth_1.default)(client_1.UserRole.USER), booking_controller_1.bookingControllers.getAllBookings);
router.put('/booking-requests/:bookingId', (0, auth_1.default)(client_1.UserRole.USER), booking_controller_1.bookingControllers.updateBooking);
exports.bookingRoutes = router;
