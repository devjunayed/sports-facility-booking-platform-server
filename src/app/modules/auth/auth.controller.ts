import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";

const logInUser = catchAsync(async (req, res) => {
    const user = await AuthService.logInUser(req.body);

})

export const AuthController = {
    logInUser
}
