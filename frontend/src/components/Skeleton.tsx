import { motion } from "framer-motion";

export const Skeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white shadow-md rounded-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg border border-gray-300 mb-6 animate-pulse"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-7 rounded-full bg-gray-300"></div>
            <div className="flex-1 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </motion.div>
      ))}
    </div>
  );
};
