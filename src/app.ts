import { Hono } from 'hono'
import userRoutes from './routes/user.route';
import blogRoutes from './routes/blog.route';


const app = new Hono<{
    Bindings: {
        DATABASE_URL: string;
    }
}>(); // Create a new Hono app

// Home Route
app.get("/", (c) => c.text("Hello Hono!"));


app.route("/api/v1/user", userRoutes);
app.route("/api/v1/blog", blogRoutes);

export default app; // Export the app