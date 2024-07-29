import { Router } from "express";
import { getUser, login, register } from "../controller/auth";
import { isLoggedIn } from "../middleware/isLoggedIn";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/",isLoggedIn, getUser);
