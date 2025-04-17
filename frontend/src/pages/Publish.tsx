import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./config";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const navigate = useNavigate();

  //   This fun is used to show the confirmation modal when the use clicked on the publish button for the confirmation
  const handlePublishClick = () => {
    setShowConfirm(true);
  };

  // This function is used to push the title and content to the backend
  const handleConfirm = async () => {
    if (isPublishing) return;
    setIsPublishing(true);
    setShowConfirm(false);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      console.log(response.data);
      navigate(`/blog/${response.data.id}`);
    } catch (error) {
      alert("Error publishing the post. Please try again.☺️");
      console.error(error);
    } finally {
      setIsPublishing(false);
    }
  };
  // Navigate to the previous page for dynamic routing
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <motion.div
      className="min-h-screen bg-neutral-100 text-black flex items-start justify-center px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-3xl bg-slate-50 p-8 rounded-2xl border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-black mb-8 text-center">
          ✍️ Create a New Post
        </h2>

        <label className="block mb-6">
          <span className="block text-black font-medium text-lg mb-2">
            Title:
          </span>
          <textarea
            placeholder="Give your article a compelling title..."
            rows={2}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 rounded-lg bg-neutral-50 border border-black/20 text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all resize-none"
          />
        </label>

        <label className="block mb-6">
          <span className="block text-black font-medium text-lg mb-2">
            Content:
          </span>
          <textarea
            placeholder="Start writing your amazing content here..."
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full p-4 rounded-lg bg-neutral-50 border border-black/20 text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all resize-y"
          />
        </label>
        <div className="flex justify-between items-center">
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleGoBack}
            className="w-full mt-4 px-6 py-3 bg-slate-300 hover:bg-slate-500 p-3 rounded-lg shadow hover:shadow-lg transition-all mr-2"
          >
            ← Go Back
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: isPublishing ? 1 : 1.05 }}
            onClick={handlePublishClick}
            disabled={isPublishing}
            className={`w-full mt-4 px-6 py-3 text-white font-semibold rounded-lg shadow hover:shadow-lg transition-all ${
              isPublishing
                ? "bg-slate-500 cursor-not-allowed opacity-70"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {isPublishing ? "Publishing..." : "🚀 Publish Now"}
          </motion.button>
        </div>
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-lg font-semibold text-black mb-4">
                Are you sure you want to publish?
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                You can’t edit after publishing unless you delete the post.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 bg-neutral-200 rounded-lg hover:bg-neutral-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                  Yes, Publish
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
