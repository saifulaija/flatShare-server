


import express from 'express'
import { flatControllers } from './flat.controller';

import { UserRole } from '@prisma/client';
import authGuard from '../../middlewares/authGard';



const router = express.Router();

router.post('/create-flat', 
authGuard(UserRole.USER),
flatControllers.createFlat 
);
router.get('/', flatControllers.getAllFlats 
);

router.put('/flats/:flatId',authGuard(UserRole.USER), flatControllers.updateFlatData)

export const flatRoutes = router;
