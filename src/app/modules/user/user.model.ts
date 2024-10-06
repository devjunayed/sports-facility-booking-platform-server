import { model, Schema } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const userSchema = new Schema<TUser, UserModel>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: 0,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
})

// encrypting user password
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_rounds))
  next()
})

// checking if user already exists
userSchema.pre('save', async function (next) {
  // console.log(this);
  const result = await User.findOne({ email: this.email })
  if (result) {
    throw new AppError(httpStatus.NOT_IMPLEMENTED, 'This email already used!')
  } else {
    next()
  }
})

// removing password as result
userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password
    return ret
  },
})

// find user by email
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password')
}

// isPasswordMatched statics methods
userSchema.statics.isPasswordMatched = async function (
  password: string,
  hashedPassword: string,
) {
  const result = await bcrypt.compare(password, hashedPassword)
  return result
}

export const User = model<TUser, UserModel>('User', userSchema)
