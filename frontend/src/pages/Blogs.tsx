import { motion } from "framer-motion";

// Dummy blog data (Replace this with API fetch if needed)
const blogData = [
  {
    id: "1",
    authorName: "John Doe",
    title: "Docker: Simplifying Development and Deployment",
    content:
      "Docker allows developers to package applications and dependencies into lightweight containers, ensuring consistency across environments. Whether you're working on local development or deploying to the cloud, Docker streamlines the process and reduces compatibility issues.",
    publishDate: "2023-01-01",
  },
  {
    id: "2",
    authorName: "Keval",
    title: "GitHub Best Practices for Developers",
    content:
      "Using GitHub effectively means writing meaningful commit messages, organizing repositories, and leveraging branches for better collaboration. Pull requests and code reviews help maintain code quality and streamline teamwork.",
    publishDate: "2025-03-19",
  },
  {
    id: "3",
    authorName: "Jane Smith",
    title: "Why Every Developer Should Use CI/CD Pipelines",
    content:
      "Continuous Integration and Continuous Deployment (CI/CD) pipelines automate the build, test, and deployment phases of software development. By integrating CI/CD into your workflow, you can catch bugs early, deploy code faster, and ensure a seamless delivery process.",
    publishDate: "2024-07-15",
  },
  {
    id: "4",
    authorName: "Chris Wilson",
    title: "Exploring the Benefits of Serverless Architecture",
    content:
      "Serverless architecture allows developers to focus on writing code without worrying about managing servers. It offers scalability, cost efficiency, and faster time-to-market, making it an attractive choice for modern application development.",
    publishDate: "2023-09-12",
  },
  {
    id: "5",
    authorName: "Michael Brown",
    title: "The Rise of TypeScript in Modern Web Development",
    content:
      "TypeScript has gained immense popularity among developers due to its ability to add static typing to JavaScript. It helps catch errors early in the development process, improves code maintainability, and enhances collaboration in large teams.",
    publishDate: "2023-05-10",
  },
  {
    id: "6",
    authorName: "Emily Davis",
    title: "Understanding React's Virtual DOM",
    content:
      "React's Virtual DOM is a lightweight representation of the real DOM. It allows React to efficiently update and render components by calculating the minimal number of changes required, leading to better performance and a smoother user experience.",
    publishDate: "2023-08-22",
  },

  {
    id: "7",
    authorName: "Sophia Martinez",
    title: "GraphQL vs REST: Choosing the Right API Design",
    content:
      "GraphQL and REST are two popular API design paradigms. While REST is simple and widely adopted, GraphQL provides more flexibility and efficiency by allowing clients to request only the data they need. Choosing the right approach depends on your project's requirements.",
    publishDate: "2023-10-05",
  },
];

export const Blogs = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      {blogData.map((blog) => (
        <motion.div
          key={blog.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white shadow-md hover:shadow-2xl transition-all rounded-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg border border-gray-200 mb-6"
        >
          <article>
            <header className="text-gray-600 text-sm flex items-center gap-3 mb-2">
              <Avatar name={blog.authorName} />
              <span className="font-semibold text-gray-800">
                {blog.authorName}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">{blog.publishDate}</span>
            </header>
            <h2 className="text-xl font-bold text-gray-900 hover:text-blue-500 transition-all">
              {blog.title}
            </h2>
            <p className="text-sm font-serif text-gray-700 mt-2 leading-relaxed">
              {blog.content.length > 100
                ? blog.content.slice(0, 100) + "..."
                : blog.content}
            </p>
            <p className="text-sm text-gray-500 mt-2">{`${Math.ceil(
              blog.content.length / 100
            )} minutes`}</p>
          </article>
        </motion.div>
      ))}
    </div>
  );
};

function Avatar({ name }: { name: string }) {
  return (
    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800">
      <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}
