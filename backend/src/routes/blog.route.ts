import { Hono } from "hono";
import { createBlog, getAllBlog, getBlogById, updateBlog } from "../controllers/blog.controller";
import { protectRoute } from "../middleware/auth.middleware";

const blogRoutes = new Hono();

blogRoutes.use(protectRoute);

blogRoutes.get("/bulk", getAllBlog);
blogRoutes.get("/:id", getBlogById);
blogRoutes.post("/", createBlog);
blogRoutes.put("/update", updateBlog);

export default blogRoutes;