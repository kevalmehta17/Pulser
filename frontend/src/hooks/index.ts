import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../pages/config";

export interface Blog {
    content: string;
    title: string;
    id: string;
    author: {
        name: string;
    };
}

// This Hook help to give the blog details by id
export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token") || "",
            }
        }).then((res) => {
            console.log(res.data.post);
            setBlog(res.data.post);
            setLoading(false);
        })
    }, [id])
    return { loading, blog };
}

// This Hook help to give the all blogs details that will render to the main page
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token") || "",
            }
        }).then((res) => {
            setBlogs(res.data.posts);
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, []);


    return { loading, blogs };
}