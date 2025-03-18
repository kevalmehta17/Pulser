import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SignupInput } from "@kevalmehta/pulser-common";
import axios from "axios";
import { BACKEND_URL } from "../pages/config";

export const Auth = ({ type }: { type: "Signup" | "Login" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  // IF user is already logged in, redirect to blogs page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/blogs");
    }
  }, [navigate]);

  const sendRequest = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "Signup" ? "signup" : "login"}`,
        postInputs
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      console.log(token);
      navigate("/blogs");
    } catch (error) {
      alert("Error occurred. Please try again");
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg"
      >
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {type === "Signup" ? "Create an account" : "Welcome back!"}
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            {type === "Signup"
              ? "Already have an account"
              : "Don't have an account"}{" "}
            <Link
              to={type === "Signup" ? "/login" : "/signup"}
              className="text-slate-500 pl-2 underline transition duration-200 ease-in-out hover:text-gray-900 hover:scale-105 hover:font-semibold"
            >
              {type === "Signup" ? "Login" : "Sign Up"}
            </Link>
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {/* Username */}
          {type === "Signup" ? (
            <LabelledInput
              label="Username"
              placeholder="Keval Mehta"
              onChange={(e) =>
                setPostInputs({ ...postInputs, name: e.target.value })
              }
            />
          ) : null}

          {/* Email */}
          <LabelledInput
            label="Email"
            placeholder="kevalmehta@gmail.com"
            onChange={(e) =>
              setPostInputs({ ...postInputs, email: e.target.value })
            }
          />

          {/* Password */}
          <LabelledInput
            label="Password"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setPostInputs({ ...postInputs, password: e.target.value })
            }
          />

          {/* Signup/Login Button with Loading Indicator */}
          <motion.button
            onClick={sendRequest}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`w-full ${
              loading ? "bg-gray-500" : "bg-black"
            } text-white py-3 rounded-lg font-semibold mt-4 text-sm sm:text-base flex items-center justify-center gap-2`}
          >
            {loading ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                {type === "Signup" ? "Signing up..." : "Logging in..."}
              </>
            ) : type === "Signup" ? (
              "Sign Up"
            ) : (
              "Login"
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

// Labelled Input Component with Framer Motion Focus Animation
interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({
  label,
  placeholder,
  type,
  onChange,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-black">
        {label}
      </label>
      <motion.input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
        placeholder={placeholder}
        required
        whileFocus={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
      />
    </div>
  );
}
