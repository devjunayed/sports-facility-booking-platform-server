import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const logInUser = async(payload: TLoginUser) => {
    const user = await User.isUserExistsByEmail(payload.email);
    console.log(user);
}

export const AuthService = {
    logInUser,
}