import { Router } from "express";
import { userRouter } from "./user";
import { authRouter } from "./auth";
import { taskRouter } from "./task";
import { isLoggedIn } from "../middleware/isLoggedIn";

export const router = Router();

router.use("/user", userRouter)
router.use("/auth", authRouter)
router.use("/task",isLoggedIn, taskRouter)