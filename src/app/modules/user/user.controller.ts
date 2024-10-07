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
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServies.getAllUserFromDb()

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All User retrieved successfully',
    data: result,
  })
})
const getSingleUser = catchAsync(async (req, res) => {
  console.log(req.params.email)
  console.log('hitting')
  const result = await UserServies.getSingleUserFromDb(req.params.email)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully',
    data: result,
  })
})

export const UserController = {
  createUser,
  getAllUser,
  getSingleUser
}
