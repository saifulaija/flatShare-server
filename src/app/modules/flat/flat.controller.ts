import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userServices } from "../user/user.service";
import { flatServices } from "./flat.service";
import {  flatValidParams } from "./flat.constant";


import { filterValidQueryParams } from "../../../shared/filterValidQueryParams";
import { Request, Response } from "express";
import { paginationAndSortingParams } from "../../../shared/appConstants";
import { VerifiedUser } from "../../interface/common";



const createFlat = catchAsync(async ( req: Request & { user?: any }, res:Response) => {
  const user= req.user;
  console.log(user)
  const result = await flatServices.createFlatIntoDB(req.body,user);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Flat added successfully",
    data: result,
  });
});


// const getAllFlats = catchAsync(async (req, res) => {
 
//   const filters=  pick(req.query,flatFilterableFields)
//   const options=pick(req.query,['page','limit','sortBy','sortOrder']);
//   console.log(options)
//  const result = await flatServices.getAllFlatsFromDB(filters,options)
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Flats retrieved successfully",
   
//     data:result,
//   });
// });
const getAllFlats = catchAsync(async (req: Request, res: Response) => {
  const validQueryParams = filterValidQueryParams(req.query, flatValidParams);
  const paginationAndSortingQueryParams = filterValidQueryParams(
    req.query,
    paginationAndSortingParams
  );

  const result = await flatServices.getAllFlatsFomDB(
    validQueryParams,
    paginationAndSortingQueryParams
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog data fetched successfully!",
    meta: result.meta,
    data: result.result,
  });
});


const updateFlatData=catchAsync(async(req,res)=>{
  const {flatId}=req.params
  const result = await flatServices.updateFlatDataIntoDB(flatId,req.body)

  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Flat information updated successfully",
    data:result
  })
})

export const flatControllers = {
  createFlat,getAllFlats,updateFlatData
};
