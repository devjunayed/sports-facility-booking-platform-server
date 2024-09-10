import { AnyZodObject } from 'zod'
import { catchAsync } from '../utils/catchAsync'
import { NextFunction, Request, Response } from 'express'

export function validateRequest(validateData: AnyZodObject) {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await validateData.parseAsync({
      body: req.body,
    })
    next()
  })
}
