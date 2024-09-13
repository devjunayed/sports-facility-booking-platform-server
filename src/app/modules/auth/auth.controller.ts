import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'
import { AuthService } from './auth.service'

const logInUser = catchAsync(async (req, res) => {
  const user = await AuthService.logInUser(req.body)
  res.cookie('token', user.accessToken)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    token: user.accessToken,
    message: 'User logged in successfully',
    data: user.user,
  })
})

export const AuthController = {
  logInUser,
}
