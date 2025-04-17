import { motion } from "framer-motion";

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-100 to-slate-200 text-black flex flex-col justify-center items-center px-6">
      <motion.div
        className="text-center max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-extrabold mb-6 leading-tight">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-slate-700 to-black">
            Pulser
          </span>
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          A powerful, clean, and modern blogging platform built for developers
          and creators.
        </p>
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.05 }}
          className="px-8 py-3 bg-black text-white font-semibold rounded-xl shadow hover:shadow-lg transition-all"
          onClick={() => (window.location.href = "/blogs")} // or use `navigate('/publish')` if using `react-router`
        >
          ✍️ Start Writing
        </motion.button>
      </motion.div>

      {/* Decorative Radial Gradient */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-black/10 to-transparent blur-3xl pointer-events-none"></div>
    </div>
  );
};
