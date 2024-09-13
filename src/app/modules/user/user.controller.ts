import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'
import { UserServies } from './user.service'

const createUser = catchAsync(async (req, res) => {
  const result = await UserServies.createUserIntoDB(req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
    data: result,
  })
})

export const UserController = {
  createUser,
}
