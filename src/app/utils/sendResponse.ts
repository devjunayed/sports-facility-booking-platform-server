import { Response } from "express"

type TResponse<T> = {
  statusCode: number
  success: boolean
  message: string
  data: T
}
export function sendResponse<T>(
  res: Response,
  { statusCode, success, message, data }: TResponse<T>,
) {
  res.status(statusCode).json({
    success,
    message,
    data,
  })
}
