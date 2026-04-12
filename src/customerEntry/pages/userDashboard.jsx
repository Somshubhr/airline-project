import UserNavbar from "../components/userNavbar";
import Chatbot from "../components/chatBot";
export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-amber-50">
      
      {/* Navbar */}
      <UserNavbar />
      <Chatbot/>
      {/* Main Content */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back 👋
        </h1>
        <p className="text-gray-600 mb-6">
          What would you like to do today?
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md cursor-pointer">
            <h2 className="text-lg font-semibold mb-2">Book a Flight</h2>
            <p className="text-gray-600">Search and book flights easily</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md cursor-pointer">
            <h2 className="text-lg font-semibold mb-2">My Bookings</h2>
            <p className="text-gray-600">View your past and upcoming trips</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md cursor-pointer">
            <h2 className="text-lg font-semibold mb-2">Profile</h2>
            <p className="text-gray-600">Manage your personal information</p>
          </div>
        </div>
      </div>
    </div>
  );
}
