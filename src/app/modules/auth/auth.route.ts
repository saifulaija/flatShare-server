import express from 'express';
import { authController } from './auth.controller';

import { UserRole } from '@prisma/client';
import authGuard from '../../middlewares/authGard';

const router = express.Router();

router.post('/login', authController.loginUser);
router.post('/refresh-token', authController.refreshToken);
router.post(
   '/change-password',
   authGuard(
      UserRole.ADMIN,
      UserRole.USER,
     
   ),
   authController.changePassword
);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

export const authRoutes = router;
