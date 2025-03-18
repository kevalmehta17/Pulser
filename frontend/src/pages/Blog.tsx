import { Blogs } from "./Blogs";

export const Blog = () => {
  return (
    <div>
      <Blogs />
    </div>
  );
};

// import { useParams } from "react-router-dom";
// import { Blogs } from "./Blogs";

// const blogData = [
//   {
//     id: "1",
//     authorName: "Keval",
//     title: "First Blog",
//     content: "This is the first blog which I am testing",
//     publishDate: "2nd August 2020",
//   },
//   {
//     id: "2",
//     authorName: "John",
//     title: "Second Blog",
//     content: "This is another test blog for routing",
//     publishDate: "10th January 2021",
//   },
// ];

// export const Blog = () => {
//   const { id } = useParams<{ id: string }>();
//   const blog = blogData.find((b) => b.id === id);

//   if (!blog) {
//     return <p className="text-center text-red-500 mt-10">Blog not found.</p>;
//   }

//   return (
//     <div>
//       <Blogs {...blog} />
//     </div>
//   );
// };
