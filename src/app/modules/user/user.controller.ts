import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userServices } from "./user.service";

const createUser= catchAsync(async (req, res) => {
    const result = await userServices.createUserIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'user regestered  succesfully',
      data: result,
    });
  });
const getUserWithProfile= catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const result = await userServices.getUserWithProfileFromDB(token);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message:  "User profile retrieved successfully",
      data: result,
    });
  });


const updateUserWithProfile= catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const result = await userServices.updateUsrProfileFromDB(token,req.body);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK ,
      message: "User profile updated successfully",
      data: result,
    });
  });


export const userControllers={
    createUser,getUserWithProfile,updateUserWithProfile
}