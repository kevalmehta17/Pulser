import { Context } from "hono";
import { getPrisma } from "../config/prisma";
import { sign } from 'hono/jwt'
import { loginInput, signupInput } from "@kevalmehta/pulser-common";

// Cloudflare Workers are stateless, so we must create a new Prisma client 
// for each request to avoid connection pooling issues.
//So that we have to call the getPrisma function to get a new Prisma client instance for each request.


export const signUp = async (c: Context) => {

    const prisma = getPrisma(c.env.DATABASE_URL);
    const body = await c.req.json(); //Parse the json body
    const { success, error } = signupInput.safeParse(body); //Validate the input
    if (!success) {
        return c.json({ error: error.format() }, 400);
    }
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
                exp: Math.floor(Date.now() / 1000) + 60 * 30 //Token expires in 30 minutes
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
    const { success, error } = loginInput.safeParse(body);
    if (!success) {
        return c.json({ errors: error.format() }, 400);
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password
            }
        });
        if (!user) {
            return c.text("Invalid email or password", 404);
        }
        //If User exist then provide the jwt token
        const payload = {
            id: user.id,
            exp: Math.floor(Date.now() / 1000) + 60 * 30//Token expires in 30 minutes
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