import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import validateAuth from "../middlewares/validateAuth.js";
import schemaSignUp from "../schemas/signUp.js";
import schemaSignIn from "../schemas/signIn.js";
import { signUp, signIn, getUserUrls } from "../controllers/userController.js";

const usersRouter = Router();

usersRouter.post("/signup", validateSchema(schemaSignUp), signUp);
usersRouter.post("/signin", validateSchema(schemaSignIn), signIn);
usersRouter.get("/users/me", validateAuth, getUserUrls);

export default usersRouter;
