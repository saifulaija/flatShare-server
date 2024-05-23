import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { bookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const result = await bookingServices.createBookingIntoDB(token, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Booking requests submitted successfully",
    data: result,
  });
});
const getAllBookings = catchAsync(async (req, res) => {
 

  const result = await bookingServices.getAllBookingsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking requests retrieved successfully",
    data: result,
  });
});
const updateBooking = catchAsync(async (req, res) => {
 
const {bookingId}=req.params;
  const result = await bookingServices.updateBookingIntoDB(bookingId,req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking requests retrieved successfully",
    data: result,
  });
});

export const bookingControllers = {
  createBooking,getAllBookings,updateBooking
};
