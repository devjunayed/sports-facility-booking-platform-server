import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";

const router = Router();


router.get("/", auth("admin"), UserController.getAllUser )
router.get("/:email", auth('admin', "user"), UserController.getSingleUser )

export const UserRoutes = router;