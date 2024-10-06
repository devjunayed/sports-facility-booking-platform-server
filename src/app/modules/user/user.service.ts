import { TUser } from '../user/user.interface'
import { User } from '../user/user.model'

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload)
  return result
}

const getAllUserFromDb = async() => {
  const result = await User.find();
  return result;
}

const getSingleUserFromDb = async(email: string) => {
  const result = await User.findOne({email});
  return result;
}

export const UserServies = {
  createUserIntoDB,
  getAllUserFromDb,
  getSingleUserFromDb
}
