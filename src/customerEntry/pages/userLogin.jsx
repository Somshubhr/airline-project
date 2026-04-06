import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function UserLogin() {
  const navigate = useNavigate();
  const [showForgot, setShowForgot] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const handleLogin = () => {
    navigate("/user");
  };


  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-amber-100"
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-96 relative">

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-3 left-3 text-sm text-gray-600 hover:text-black"
        >
          ← Back
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">User Login</h2>

        {/* Login Inputs */}
        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Email"
        />

        <input
          className="w-full mb-2 p-2 border rounded"
          type="password"
          placeholder="Password"
        />

        {/* Forgot Password */}
        <button
          onClick={() => setShowForgot(true)}
          className="text-sm text-blue-600 hover:underline mb-4"
        >
          Forgot Password?
        </button>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleLogin}
            className="flex-1 bg-amber-500 text-white py-2 rounded hover:bg-amber-600">
            Login
          </button>

          <button
            onClick={() => setShowSignup(true)}
            className="flex-1 border border-amber-500 text-amber-600 py-2 rounded hover:bg-amber-50"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* SIGN UP MODAL */}
      <AnimatePresence>
        {showSignup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-lg w-96 relative"
            >
              <button
                onClick={() => setShowSignup(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                ✕
              </button>

              <h3 className="text-lg font-bold mb-4 text-center">
                  Create Account
              </h3>

              <input
                className="w-full mb-3 p-2 border rounded"
                placeholder="Full Name"
              />

              <input
                className="w-full mb-3 p-2 border rounded"
                placeholder="Email"
              />

              <input
                className="w-full mb-3 p-2 border rounded"
                type="password"
                placeholder="Password"
              />

              <input
                className="w-full mb-4 p-2 border rounded"
                type="password"
                placeholder="Confirm Password"
              />

              <button className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600">
                Sign Up
              </button>

              <p className="text-sm text-center mt-3 text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => setShowSignup(false)}
                  className="text-blue-600 hover:underline"
                >
                  Login
                </button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Forgot password modal already exists – unchanged */}
    </motion.div>
  );
}
