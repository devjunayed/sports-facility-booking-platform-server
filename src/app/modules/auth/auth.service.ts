import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import config from '../../config'
import { createToken } from './auth.utils'

const logInUser = async (payload: TLoginUser) => {
  // getting user from db
  const user = await User.isUserExistsByEmail(payload.email)

  // throwing error if no user found
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
  }

  // chekcing if the user password is valid
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password mismatch!')
  }

  // create token and sent to the client
  const jwtPayload = {
    email: user.email,
    role: user.role as string,
  }

  // generating access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  // generating refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )

  return { accessToken, refreshToken, user }
}

export const AuthService = {
  logInUser,
}
