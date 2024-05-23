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
exports.userServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_decode_1 = require("jwt-decode");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = yield bcrypt_1.default.hash(payload.password, 12);
    const isExistUser = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (isExistUser) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This email is already registered");
    }
    const userDate = {
        name: payload.name,
        email: payload.email,
        password: hashPassword,
    };
    const userData = yield prisma_1.default.user.create({
        data: userDate,
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    const profileInfo = {
        userId: userData === null || userData === void 0 ? void 0 : userData.id,
        bio: payload.bio,
        address: payload.address,
        profession: payload.profession,
    };
    yield prisma_1.default.userProfile.create({
        data: profileInfo,
    });
    return userData;
});
const getUserWithProfileFromDB = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = (0, jwt_decode_1.jwtDecode)(token);
    const userId = decoded.id;
    console.log("user", userId);
    const result = yield prisma_1.default.userProfile.findUniqueOrThrow({
        where: {
            userId,
        },
    });
    return result;
});
const updateUsrProfileFromDB = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = (0, jwt_decode_1.jwtDecode)(token);
    const userId = decoded.id;
    console.log("user", userId);
    const result = yield prisma_1.default.userProfile.update({
        where: {
            userId,
        },
        data: payload,
    });
    return result;
});
exports.userServices = {
    createUserIntoDB,
    getUserWithProfileFromDB,
    updateUsrProfileFromDB,
};
