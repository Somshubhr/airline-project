import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // later: validate admin credentials via backend
    navigate("/admin");
  };

  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-900"
    >
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 relative">

        <button
          onClick={() => navigate("/")}
          className="absolute top-3 left-3 text-sm text-gray-300 hover:text-white"
        >
          ← Back
        </button>

        <h2 className="text-xl font-bold mb-4 text-center text-white">
          Admin Login
        </h2>

        <input
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
          placeholder="Admin ID"
        />

        <input
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
          type="password"
          placeholder="Password"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Login
        </button>
      </div>
    </motion.div>
  );
}
