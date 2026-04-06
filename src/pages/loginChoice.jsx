import { Link } from "react-router-dom";

export default function LoginChoice() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-100">
      <div className="bg-white p-10 rounded-xl shadow-md text-center w-96">
        <h1  className="text-2xl font-bold mb-6">Welcome to lucky air services</h1>
        <h2 className="text-2xl font-bold mb-6">Login As</h2>

        <Link
          to="/login"
          className="block mb-4 bg-amber-500 text-white py-3 rounded hover:bg-amber-600"
        >
          User Login
        </Link>

        <Link
          to="/admin/login"
          className="block bg-gray-800 text-white py-3 rounded hover:bg-gray-900"
        >
          Admin Login
        </Link>
      </div>
    </div>
  );
}
