import express, { NextFunction, Request, Response } from "express";
import { userControllers } from "./user.controller";


import { UserRole } from "@prisma/client";


import authGuard from "../../middlewares/authGard";


const router = express.Router();

router.post('/register', userControllers.createUser)

router.get("/profile", authGuard(UserRole.USER), userControllers.getUserWithProfile);
router.put(
  "/profile",
  authGuard(UserRole.USER),
  userControllers.updateUserWithProfile
);

export const userRoutes = router;
