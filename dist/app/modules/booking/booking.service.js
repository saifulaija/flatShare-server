"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingServices = void 0;
const jwt_decode_1 = require("jwt-decode");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createBookingIntoDB = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = (0, jwt_decode_1.jwtDecode)(token);
    const userId = decoded.id;
    const bookingData = Object.assign(Object.assign({}, payload), { userId });
    const result = yield prisma_1.default.booking.create({
        data: bookingData,
    });
    return result;
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findMany();
    return result;
});
const updateBookingIntoDB = (bookingId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ bookingId });
    const result = yield prisma_1.default.booking.update({
        where: {
            id: bookingId
        },
        data: payload
    });
    return result;
});
exports.bookingServices = {
    createBookingIntoDB, getAllBookingsFromDB, updateBookingIntoDB
};
