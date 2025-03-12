import { Hono } from "hono";
import { signIn, login } from "../controllers/user.controller";

const userRoutes = new Hono();

userRoutes.post("/signin", signIn);
userRoutes.post("/login", login);

export default userRoutes;