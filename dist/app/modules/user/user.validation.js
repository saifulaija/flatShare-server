"use strict";
// import { z } from "zod";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
// const createUser = z.object({
//     name: z.string({
//         required_error: "name is required",
//       }),
//       email: z.string({
//         required_error: "name is required",
//       }),
//       password: z.string({
//         required_error: "password is required",
//       }),
//       bio: z.string({
//         required_error: "bio is required",
//       }),
//       profession: z.string({
//         required_error: "profession is required",
//       }),
//       address: z.string({
//         required_error: "profession is required",
//       }),
// });
const zod_1 = require("zod");
const createUser = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "name is required",
    }),
    email: zod_1.z.string({
        required_error: "name is required",
    }),
    password: zod_1.z.string({
        required_error: "password is required",
    }),
    bio: zod_1.z.string({
        required_error: "bio is required",
    }),
    profession: zod_1.z.string({
        required_error: "profession is required",
    }),
    address: zod_1.z.string({
        required_error: "profession is required",
    }),
});
exports.userValidations = {
    createUser
};
