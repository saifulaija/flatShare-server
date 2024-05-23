import express from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { flatRoutes } from "../modules/flat/flat.route";
import { bookingRoutes } from "../modules/booking/booking.route";
import path from "path";
import { imageRoutes } from "../modules/image/image.route";


const router = express.Router();

const moduleRoutes = [
  {
    path: "/user" ,
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/flat",
    route: flatRoutes,
  },
  {
    path: "/",
    route: bookingRoutes,
  },
  {
    path:'/image',
    route:imageRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
