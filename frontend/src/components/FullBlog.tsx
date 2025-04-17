import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      {" "}
      <Appbar />
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-10 ">
          <div className=" col-span-8 ">
            <div className="text-4xl font-bold text-black">{blog.title}</div>
            <div className="text-sm text-gray-500 mt-2">
              Posted on{" "}
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>{" "}
            <div className="text-sm text-gray-500 mt-2">{blog.author.name}</div>
            <div className="text-xl font-sans text-gray-500 mt-2">
              {blog.content}
            </div>
          </div>
          <div className=" col-span-4">
            <div className="text-gray-600 text-lg">Author</div>
            <div className="flex ">
              <div className="pr-4 flex items-center justify-center">
                <Avatar
                  size="big"
                  name={blog.author.name ? blog.author.name : "Anonymous"}
                />
              </div>

              <div>
                <div className="font-bold text-2xl ">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="text-gray-500 text-sm pt-2">
                  Radom Catch phase about the author ability
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
