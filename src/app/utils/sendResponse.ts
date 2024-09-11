import { Response } from "express"

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

  if(token){
    responseData.token = token;
  }

  res.status(statusCode).json(responseData);
}
