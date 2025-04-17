import { Context } from "hono";
import { getPrisma } from "../config/prisma";
import { blogPostInput, updateBlogPostInput } from "@kevalmehta/pulser-common";

export const createBlog = async (c: Context) => {

    const prisma = getPrisma(c.env.DATABASE_URL);
    const userId = c.get('userId');
    const body = await c.req.json();
    const { success, error } = blogPostInput.safeParse(body);
    if (!success) {
        return c.json({ error: error.format() }, 400);
    }
    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })
        return c.json({
            id: post.id
        });
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return c.text(error.message, 500);
        }
        return c.text("Unknown Error occurred", 500);
    }

}

export const updateBlog = async (c: Context) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const userId = c.get('userId');
    const body = await c.req.json();
    const { success, error } = updateBlogPostInput.safeParse(body);
    if (!success) {
        return c.json({ error: error.format() }, 400);
    }
    try {
        const updatedBlog = await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content
            }

        })

        return c.json(updatedBlog);
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return c.text(error.message, 500);
        }
        return c.text("Unknown Error occurred", 500);
    }

}

export const getBlogById = async (c: Context) => {

    const id = c.req.param('id');
    const prisma = getPrisma(c.env.DATABASE_URL);
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id
            },
            select: {
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({ message: "Post found", post });
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return c.text(error.message, 500);
        }
        return c.text("Unknown Error occurred", 500);
    }

}

export const getAllBlog = async (c: Context) => {
    const prisma = getPrisma(c.env.DATABASE_URL);

    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc"
            },
            select: {
                title: true,
                content: true,
                id: true,
                createdAt: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        console.log("All the available Post", posts);
        return c.json({ posts });
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return c.text(error.message, 500);
        }
        return c.text("Unknown Error occurred", 500);
    }

}