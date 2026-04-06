import { useNavigate } from "react-router-dom";

export default function UserNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-amber-500 text-white px-6 py-4 flex items-center justify-between">
      
      {/* Brand */}
      <div
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/user")}
      >
        Lucky Air
      </div>

      {/* Menu */}
      <div className="flex gap-6 text-sm md:text-base">
        <button className="hover:underline">Dashboard</button>
        <button className="hover:underline">Bookings</button>
        <button className="hover:underline">Profile </button>
      </div>

      {/* Logout */}
      <button
        onClick={() => navigate("/login")}
        className="bg-white text-amber-600 px-4 py-2 rounded hover:bg-amber-100 text-sm"
      >
        Logout
      </button>
    </nav>
  );
}
