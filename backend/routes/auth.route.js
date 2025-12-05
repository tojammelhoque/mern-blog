import express from "express";
import { googleAuth, loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/google", googleAuth);
authRouter.post("/logout", logoutUser);

export default authRouter;
