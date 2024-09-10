/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next ) => {

    const statusCode = 500;

    return res.status(statusCode).json({
        success: false,
        message: err.message,
        err
    })
}
export default globalErrorHandler;