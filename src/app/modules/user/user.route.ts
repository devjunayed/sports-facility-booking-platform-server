import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";

const router = Router();


router.get("/user", auth("admin"), UserController.getAllUser )
router.get("/user/:email", auth("admin"), UserController.getSingleUser )

export const UserRoutes = router;