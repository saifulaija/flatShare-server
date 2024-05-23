import { IFlatFilterParams } from "./flat.interface";
import { Flat, Image, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";

import { flatSearchableFields } from "./flat.constant";
import { IPaginationParams, ISortingParams } from "../../interface/paginationSorting";
import { generatePaginateAndSortOptions } from "../../../helpers/paginationHelpers";
import { HTTPError } from "../../errors/HTTPError.ts";
import { BAD_REQUEST } from "http-status";

const createFlatIntoDB = async (payload: Flat & Image,user:any) => {

  const {image,...payloadDta}=payload

  const userData= await prisma.user.findUnique({
    where:{
      email:user.email
    }
  })

  console.log(userData)

  if(!user){
    throw new HTTPError(BAD_REQUEST,'user not found')
  }

  const flatData={...payloadDta,userId:user.userId}
 
  const result = await prisma.$transaction(async(tx)=>{

    const createFlat = await tx.flat.create({
      data:flatData
    });

   

    const imageUpload=await tx.image.create({
      data:{
        url:image  ,
        flatId:createFlat.id
      }
    })
    return createFlat
  })

  return result;
};


const getAllFlatsFomDB = async (
  queryParams: IFlatFilterParams,
  paginationAndSortingQueryParams: IPaginationParams & ISortingParams
) => {
  const { q, ...otherQueryParams } = queryParams;

  const { limit, skip, page, sortBy, sortOrder } =
    generatePaginateAndSortOptions({
      ...paginationAndSortingQueryParams,
    });

  //  const conditions: Prisma.BlogWhereInput[] = [];
  const conditions: Prisma.FlatWhereInput[] = [];

  // filtering out the soft deleted users
  // conditions.push({
  //   visibility: Visibility.PUBLIC,
  // });

  //@ searching
  if (q) {
    const searchConditions = flatSearchableFields.map((field) => ({
      [field]: { contains: q, mode: "insensitive" },
    }));
    conditions.push({ OR: searchConditions });
  }

  //@ filtering with exact value
  if (Object.keys(otherQueryParams).length > 0) {
    const filterData = Object.keys(otherQueryParams).map((key) => ({
      [key]: (otherQueryParams as any)[key],
    }));
    conditions.push(...filterData);
  }

  const result = await prisma.flat.findMany({
    where: { AND: conditions },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include:{
      image:true
    }
    
  });

  const total = await prisma.flat.count({
    where: { AND: conditions },
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    result,
  };
};



const updateFlatDataIntoDB = async (userId: string, payload: Partial<Flat>) => {
  console.log({ userId });

  const result = await prisma.flat.update({
    where: {
      id: userId,
    },
    data: payload,
  });
  return result;
};

export const flatServices = {
  createFlatIntoDB,
getAllFlatsFomDB,
  updateFlatDataIntoDB,
};
