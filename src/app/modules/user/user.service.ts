import { User, UserProfile, UserRole } from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";
import { jwtDecode } from "jwt-decode";

import httpStatus from "http-status";
import { HTTPError } from "../../errors/HTTPError.ts";

const createUserIntoDB = async (payload: User & UserProfile) => {
  const hashPassword: string = await bcrypt.hash(payload.password, 12);

  const isExistUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isExistUser) {
    throw new HTTPError(
      httpStatus.BAD_REQUEST,
      "This email is already registered"
    );
  }

  const userData = {
    userName: payload.userName,
    email: payload.email,
    password: hashPassword,
    role: UserRole.USER,
  };

  const result = await prisma.$transaction(async (tx) => {
    const userCreate = await tx.user.create({
      data: userData,
    });

    const userProfileCreate = tx.userProfile.create({
      data: {
        userName: payload.userName,
        email: payload.email,
        role: UserRole.USER,
        userId: userCreate.id,
      },
    });

    return userCreate;
  });

  return result;
};

const getUserWithProfileFromDB = async (token: any) => {
  const decoded: User = jwtDecode(token);
  const userId = decoded.id;
  console.log("user", userId);
  const result = await prisma.userProfile.findUniqueOrThrow({
    where: {
      userId,
    },
  });
  return result;
};
const updateUsrProfileFromDB = async (
  token: any,
  payload: Partial<UserProfile>
) => {
  const decoded: User = jwtDecode(token);
  const userId = decoded.id;
  console.log("user", userId);
  const result = await prisma.userProfile.update({
    where: {
      userId,
    },
    data: payload,
  });
  return result;
};
export const userServices = {
  createUserIntoDB,
  getUserWithProfileFromDB,
  updateUsrProfileFromDB,
};
