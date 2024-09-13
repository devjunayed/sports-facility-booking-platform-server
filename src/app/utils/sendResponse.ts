import { Response } from 'express'
import httpStatus from 'http-status'

type TResponse<T> = {
  statusCode: number
  success: boolean
  token?: string
  message: string
  data: T
}
export function sendResponse<T>(
  res: Response,
  { statusCode, success, token, message, data }: TResponse<T>,
) {
  const responseData: TResponse<T> = {
    success,
    statusCode,
    message,
    data,
  }

  if (token) {
    responseData.token = token
  }

  if ((Array.isArray(data) && data?.length === 0) || !data) {
    responseData.data = (Array.isArray(data) ? [] : null) as T
    responseData.message = 'No Data Found'
    responseData.statusCode = httpStatus.NOT_FOUND
    responseData.success = false
  }

  res.status(responseData.statusCode).json(responseData)
}
