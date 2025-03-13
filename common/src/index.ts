import { z } from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string()
        .min(6, "Password must be at least 6 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[\W_]/, "Password must contain at least one special character"),
    name: z.string().optional(),
});

export const loginInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const blogPostInput = z.object({
    title: z.string().min(1, "Title cannot be empty").optional(),
    content: z.string().min(1, "Content cannot be empty").optional(),
});

export const updateBlogPostInput = z.object({
    id: z.string().uuid(),
    title: z.string().min(1, "Title cannot be empty").optional(),
    content: z.string().min(1, "Content cannot be empty").optional(),
    published: z.boolean().optional(),
});

//Proving TypeInference in Zod
export type SignupInput = z.infer<typeof signupInput>
export type LoginInput = z.infer<typeof loginInput>
export type BlogPostInput = z.infer<typeof blogPostInput>
export type UpdateBlogPostInput = z.infer<typeof updateBlogPostInput>