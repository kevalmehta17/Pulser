// Cloudflare Workers are stateless, so we must create a new Prisma client 
// for each request to avoid connection pooling issues.
//So that we have to call the getPrisma function to get a new Prisma client instance for each request.

import { Context } from "hono";
import { getPrisma } from "../config/prisma";
import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";
import { loginInput, signupInput } from "@kevalmehta/pulser-common";

export const signUp = async (c: Context) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const body = await c.req.json();
    const { success, error } = signupInput.safeParse(body);

    if (!success) {
        return c.json({ error: error.format() }, 400);
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: body.email }
        });

        if (existingUser) {
            return c.json({ error: "User already exists" }, 400);
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword
            }
        });

        const payload = {
            id: user.id,
            exp: Math.floor(Date.now() / 1000) + 60 * 30, // Token expires in 30 min
        };

        const token = await sign(payload, c.env.JWT_SECRET);
        return c.json({ token });
    } catch (error) {
        console.error(error);
        return c.text("An error occurred", 500);
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
        const user = await prisma.user.findUnique({
            where: { email: body.email }
        });

        if (!user) {
            return c.text("Invalid email or password", 404);
        }

        const isPasswordValid = await bcrypt.compare(body.password, user.password);
        if (!isPasswordValid) {
            return c.text("Invalid email or password", 401);
        }

        const payload = {
            id: user.id,
            exp: Math.floor(Date.now() / 1000) + 60 * 30,
        };

        const token = await sign(payload, c.env.JWT_SECRET);
        return c.json({ token });
    } catch (error) {
        console.log(error);
        return c.text("An unknown error occurred", 500);
    }
};
