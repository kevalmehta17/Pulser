import { motion } from "framer-motion";

export const Publish = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#88dc5e] to-[#eef1f6] flex items-start justify-center px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-3xl bg-slate-50 backdrop-blur-md p-8 rounded-3xl border border-gray-500 shadow-2xl"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          ✍️ Create a New Post
        </h2>

        <label className="block mb-6">
          <span className="block text-gray-800 font-medium text-lg mb-2">
            Title:
          </span>
          <textarea
            placeholder="Give your article a compelling title..."
            rows={2}
            className="w-full p-4 rounded-xl bg-slate-100 border border-gray-300 placeholder-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm resize-none transition-all"
          />
        </label>

        <label className="block mb-6">
          <span className="block text-gray-800 font-medium text-lg mb-2">
            Content:
          </span>
          <textarea
            placeholder="Start writing your amazing content here..."
            rows={10}
            className="w-full p-4 rounded-xl bg-slate-100 border border-gray-300 placeholder-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm resize-y transition-all"
          />
        </label>

        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.05 }}
          className="w-full mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition-all"
        >
          🚀 Publish Now
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
