import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const getPrisma = (DATABASE_URL: string) => {
    return new PrismaClient({
        datasourceUrl: DATABASE_URL,
    }).$extends(withAccelerate());
};
