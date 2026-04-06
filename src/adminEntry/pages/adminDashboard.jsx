import AdminNavbar from "../components/adminNavbar";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      {/* Navbar */}
      <AdminNavbar />

      {/* Main Content */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">
          Dashboard
        </h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Users</h2>
            <p className="text-gray-400">Manage registered users</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Bookings</h2>
            <p className="text-gray-400">View flight bookings</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Reports</h2>
            <p className="text-gray-400">Analytics & reports</p>
          </div>
        </div>
      </div>
    </div>
  );
}
