import { TUser } from '../user/user.interface'
import { User } from '../user/user.model'

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload)
  return result
}

export const UserServies = {
  createUserIntoDB,
}
