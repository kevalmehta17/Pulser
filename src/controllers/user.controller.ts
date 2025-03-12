import { Context } from "hono";
import { getPrisma } from "../config/prisma";
import { decode, sign, verify } from 'hono/jwt'

// Cloudflare Workers are stateless, so we must create a new Prisma client 
// for each request to avoid connection pooling issues.
//So that we have to call the getPrisma function to get a new Prisma client instance for each request.


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
        if (user) {
            const payload = {
                id: user.id,
                exp: Math.floor(Date.now() / 1000) + 60 * 5 //Token expires in 5 minutes
            }
            const secret = c.env.JWT_SECRET;
            const token = await sign(payload, secret);
            return c.json({ token });
        }
        return c.text("signin success");
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return c.text(error.message);
        }
        return c.text("An unknown error occurred");
    }
};

export const login = async (c: Context) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const body = await c.req.json();
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password
            }
        });
        if (!user) {
            return c.text("User not found", 404);
        }
        //If User exist then provide the jwt token
        const payload = {
            id: user.id,
            exp: Math.floor(Date.now() / 1000) + 60 * 5 //Token expires in 5 minutes
        }
        const secret = c.env.JWT_SECRET;
        const token = await sign(payload, secret);
        return c.json({ token });
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return c.text(error.message, 500);
        }
        return c.text("An unknown error occurred", 500);

    }
};