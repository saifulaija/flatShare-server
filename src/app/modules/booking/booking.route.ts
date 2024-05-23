import express from 'express'
import { bookingControllers } from './booking.controller'

import { UserRole } from '@prisma/client'
import authGuard from '../../middlewares/authGard'
const router = express.Router()

router.post('/booking-applications',authGuard(UserRole.USER), bookingControllers.createBooking)
router.get('/booking-requests',authGuard(UserRole.USER), bookingControllers.getAllBookings)
router.put('/booking-requests/:bookingId',authGuard(UserRole.USER), bookingControllers.updateBooking)


export const bookingRoutes=router