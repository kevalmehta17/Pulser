import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  title: string;
  content: string;
  authorName: string;
  publishDate?: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
}: //   publishDate,
BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-md hover:shadow-2xl transition-all rounded-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg border border-gray-200 mb-6"
      >
        <article>
          <header className="text-gray-600 text-sm flex items-center gap-3 mb-2">
            <Avatar name={authorName} />
            <span className="font-semibold text-gray-800">{authorName}</span>
            <span className="text-gray-400">•</span>
            {/* You can show the publish date here if needed */}
          </header>
          <h2 className="text-xl font-bold text-gray-900 hover:text-blue-500 transition-all">
            {title}
          </h2>
          <p className="text-sm font-serif text-gray-700 mt-2 leading-relaxed">
            {content.length > 100 ? content.slice(0, 100) + "..." : content}
          </p>
          <p className="text-sm text-gray-500 mt-2">{`${Math.ceil(
            content.length / 100
          )} minutes`}</p>
        </article>
      </motion.div>
    </Link>
  );
};

export const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800  outline-none focus:outline-none">
      <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};
