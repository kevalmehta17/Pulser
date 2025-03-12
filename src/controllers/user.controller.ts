import { Context } from "hono";
import { getPrisma } from "../config/prisma";

export const signIn = async (c: Context) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const body = await c.req.json(); //Parse the json body
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
            }
        });
        return c.text("signin success");
    } catch (error) {
        console.error(error);
        return c.text("signin failed", 500);
    }
};

export const login = async (c: Context) => { };