/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export type TRole = 'admin' | 'user' | ('admin' | "user")[];
export type TUser = {
  _id?: string
  name: string
  email: string
  password: string
  phone: string
  role: TRole
  address: string
}

export interface UserModel extends Model<TUser> {
  // instance method for checking if user exist by email
  isUserExistsByEmail(email: string): Promise<TUser>

  // instance method for checking if user passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
}
