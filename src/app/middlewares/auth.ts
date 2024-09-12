/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { TRole } from '../modules/user/user.interface'
import { catchAsync } from '../utils/catchAsync'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'
import config from '../config'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from '../modules/user/user.model'

const auth = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to access this',
      )
    }

    // checking if the toke is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload

    const { role, email, iat } = decoded

    // checking if the user is exsist
    const user = await User.isUserExistsByEmail(email)

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user not found')
    }

    // checking if the user role is allowed
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
    }
    req.user = decoded as JwtPayload;
    next();
  })
}

export default auth;
