


import express from 'express'


import { UserRole } from '@prisma/client';
import authGuard from '../../middlewares/authGard';
import { imageControllers } from './image.controller';


const router = express.Router();

router.post('/create-image',
//  authGuard(UserRole.USER), 
imageControllers.createImage 
);
// router.get('/flats', flatControllers.getAllFlats 
// );

// router.put('/flats/:flatId',authGuard(UserRole.USER), flatControllers.updateFlatData)

export const imageRoutes = router;
