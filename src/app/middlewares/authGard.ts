import { NextFunction, Request, Response } from 'express';

import { Secret } from 'jsonwebtoken';
import config from '../../config/config';

import httpStatus from 'http-status';
import { HTTPError } from '../errors/HTTPError.ts';
import { jwtHelpers } from '../../helpers/jwtHelpers';

const authGuard = (...roles: string[]) => {
   return (
      req: Request & { user?: any },
      _res: Response,
      next: NextFunction
   ) => {
      const token = req.headers.authorization;
      if (!token) {
         throw new HTTPError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      console.log(token)

      try {
         const verifiedUser = jwtHelpers.verifyToken(
            token,
            config.jwt.jwt_secret as Secret
         );

         if (roles.length && !roles.includes(verifiedUser.role)) {
            throw new HTTPError(
               httpStatus.UNAUTHORIZED,
               "You don't have the permission"
            );
         }

         req.user = verifiedUser;
         next();
      } catch (error) {
         next(error);
      }
   };
};

export default authGuard;
