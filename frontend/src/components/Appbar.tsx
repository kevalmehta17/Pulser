import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Avatar } from "./BlogCard";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const Appbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // build the close if Esc or Mouse down pressed
  useEffect(() => {
    const closeMenu = (e: KeyboardEvent | MouseEvent) => {
      if (e instanceof KeyboardEvent && e.key === "Escape") setMenuOpen(false);
      if (e instanceof MouseEvent)
        // Menu-dropdown is
        setMenuOpen(false);
    };
    if (menuOpen) {
      document.addEventListener("keydown", closeMenu);
      document.addEventListener("mousedown", closeMenu);
    }
    return () => {
      document.removeEventListener("keydown", closeMenu);
      document.removeEventListener("mousedown", closeMenu);
    };
    // const closeMenu = (e: KeyboardEvent) => {
    //   if (e.key === "Escape") {
    //     setMenuOpen(false);
    //   }
    // };
    // if (menuOpen) {
    //   window.addEventListener("keydown", closeMenu);
    // } else {
    //   window.removeEventListener("keydown", closeMenu);
    // }
    // return () => window.removeEventListener("keydown", closeMenu);
  }, [menuOpen]);

  // Logout Function
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const MotionLink = motion(Link);

  return (
    // parent div for the appbar
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="border-b bg-white/70 backdrop-blur-lg shadow-md flex items-center justify-between  px-6 py-4 sm:px-10"
    >
      {/* Logo - 1st child div */}
      <Link to="/">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-2xl font-bold text-gray-900 cursor-pointer"
        >
          Pulser
        </motion.div>
      </Link>

      {/* Navigation Links - Hidden on small screens */}
      {/* 2nd child div */}
      <div className="hidden text-xl font-serif sm:flex items-center gap-6 text-gray-700 font-medium">
        <MotionLink
          to="/home"
          whileHover={{ scale: 1.05, color: "#1d4ed8" }}
          className="hover:text-blue-600 transition-all cursor-pointer"
        >
          Home
        </MotionLink>
        <motion.a
          whileHover={{ scale: 1.05, color: "#1d4ed8" }}
          className="hover:text-blue-600 transition-all cursor-pointer"
        >
          Blogs
        </motion.a>
        {/* <motion.a
          whileHover={{ scale: 1.05, color: "#1d4ed8" }}
          className="hover:text-blue-600 transition-all cursor-pointer"
        >
          About
        </motion.a> */}
      </div>
      {/* User Avatar with Dropdown */}
      {/* 3rd child div */}
      <div className="relative">
        <div className="flex items-center gap-2">
          <Link to={"/publish"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="text-white bg-black  focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2"
            >
              Publish
            </motion.button>
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Avatar name="Keval" />
          </button>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 text-sm font-medium"
          >
            <button
              onClick={handleLogOut}
              className="block px-4 py-2 hover:bg-gray-200"
            >
              Logout
            </button>
          </motion.div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="sm:hidden p-2 rounded-md bg-gray-100"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
    </motion.div>
  );
};
