import { Hono } from "hono";
import { login, signUp } from "../controllers/user.controller";

const userRoutes = new Hono();

userRoutes.post("/signup", signUp);
userRoutes.post("/login", login);

export default userRoutes;