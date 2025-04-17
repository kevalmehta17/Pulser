import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { BlogCard } from "../components/BlogCard";
import { Skeleton } from "../components/Skeleton";

// This component renders the list of blogs on the main page
export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div>
      <Appbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            content={blog.content}
            authorName={blog.author?.name || "Anonymous"}
            // publishDate={blog.published}
          />
        ))}
      </div>
    </div>
  );
};
