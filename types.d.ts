import { JwtPayload } from 'jsonwebtoken'

declare module 'sslcommerz-lts';


declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}
