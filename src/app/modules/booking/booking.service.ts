import { Booking } from "@prisma/client";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { TToken } from "./booking.interface";
import { jwtDecode } from "jwt-decode";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
const createBookingIntoDB = async (token: any, payload: { flatId: string }) => {
  const decoded: Booking = jwtDecode(token);
  const userId = decoded.id;

  const bookingData = {
    ...payload,
    userId,
  };

  const result = await prisma.booking.create({
    data: bookingData,
  });
  return result;
};

const getAllBookingsFromDB=async()=>{
const result =await prisma.booking.findMany()
return result
}

const updateBookingIntoDB=async(bookingId:string, payload:Partial<Booking>)=>{
    console.log({bookingId})
    const result =await prisma.booking.update({
        where:{
            id:bookingId
        },
        data:payload
    })

    return result
}

export const bookingServices = {
  createBookingIntoDB,getAllBookingsFromDB,updateBookingIntoDB
};
