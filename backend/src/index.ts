
import app from './app';
export default app;














// import { Hono } from 'hono'
// import { PrismaClient } from '@prisma/client/edge'
// import { withAccelerate } from '@prisma/extension-accelerate'


// const app = new Hono<{
//   Bindings: {
//     DATABASE_URL: string;
//   }
// }>()

// app.get('/', (c) => {
//   return c.text('Hello Hono!')
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate())

// })

// app.get("/api/v1/user/signin", (c) => {
//   return c.text("Signin success")
// })

// app.get("/api/v1/user/login", (c) => {
//   return c.text("Login success")
// })

// app.get("/api/v1/blog", (c) => {
//   return c.text("Blog created")
// })
// app.get("/api/v1/blog/blog", (c) => {
//   return c.text("Blog created")
// })

// export default app
