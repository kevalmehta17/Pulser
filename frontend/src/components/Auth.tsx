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
  // IF user is already logged in, redirect to blogs page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/blogs");
    }
  }, [navigate]);

  const sendRequest = async () => {
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
      //Alert the user if there is an error
      alert("Error occurred. Please try again");
      if (error instanceof Error) {
        console.error(error.message);
      }
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
            Create an account
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

          {/* Signup Button with Animation */}
          <motion.button
            onClick={sendRequest}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold mt-4 text-sm sm:text-base"
          >
            {type === "Signup" ? "Sign Up" : "Login"}
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
