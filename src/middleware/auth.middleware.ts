import { Context, Next } from 'hono';
import { verify } from "hono/jwt";

export const protectRoute = async (c: Context, next: Next) => {

    const JWT_SECRET_KEY = c.env.JWT_SECRET;
    console.log("JWT Secret Key:", JWT_SECRET_KEY);
    if (!JWT_SECRET_KEY) {
        console.log('JWT_SECRET_KEY not found');
    }

    let token = c.req.header('Authorization');
    console.log("Received Token:", token);


    if (!token) {
        return c.json({ message: 'Unauthorized: No token provided' }, 401);
    }
    //If token starts with "Bearer",remove it
    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }
    console.log("Extracted Token:", token);

    try {
        const payload = await verify(token, JWT_SECRET_KEY);
        console.log("Decoded Payload:", payload);

        if (!payload) {
            return c.json({ message: 'Unauthorized: Invalid token' }, 401);
        }
        //
        c.set('userId', payload.id);
        // Later,retrieve the same value with c.get('userId').
        await next();
    } catch (error) {
        console.log("Error in authMiddleware", error);
        return c.json({ message: 'Unauthorized Error: Invalid Token' }, 401);
    }
}




// e64a4086-5c8b-47bb-a516-3793fa1db945



// function verify(token: string, JWT_SECRET_KEY: any) {
//     throw new Error('Function not implemented.');
// }
// // import { Context, Next } from 'hono';
// import { verifyToken } from '../utils/jwt';

// export const authMiddleware = async (c: Context, next: Next) => {
//     const authHeader = c.req.headers.get('Authorization');
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return c.json({ message: 'Unauthorized' }, 401);
//     }

//     const token = authHeader.split(' ')[1];
//     try {
//         const decoded = verifyToken(token);
//         c.set('user', decoded);
//         await next();
//     } catch (error) {
//         return c.json({ message: 'Unauthorized' }, 401);
//     }
// };