import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
      
      {/* Brand */}
      <div
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/admin")}
      >
        Admin Panel
      </div>

      {/* Menu */}
      <div className="flex gap-6 text-sm md:text-base">
        <button className="hover:text-amber-400">Dashboard</button>
        <button className="hover:text-amber-400">Users</button>
        <button className="hover:text-amber-400">Bookings</button>
        <button className="hover:text-amber-400">Reports</button>
      </div>

      {/* Logout */}
      <button
        onClick={() => navigate("/admin/login")}
        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-sm"
      >
        Logout
      </button>
    </nav>
  );
}
