import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
// import { Blogs } from "./Blogs";
import { FullBlog } from "../components/FullBlog";

// This page is used to show the blog details of a single blog connected with the FullBlog Component

export const SingleBlog = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, blog } = useBlog({
    id: id || "",
  });
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-2/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          <div className="h-4 bg-gray-200 rounded w-3/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div>{blog ? <FullBlog blog={blog} /> : <div>Blog not found</div>}</div>
  );
};
