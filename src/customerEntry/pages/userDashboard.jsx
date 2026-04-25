import { useEffect, useState } from "react";
import Chatbot from "../components/chatBot";
import UserNavbar from "../components/userNavbar";
import { fetchFlights } from "../../shared/flightStore";

export default function UserDashboard() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFlights, setShowFlights] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [userName, setUserName] = useState("Traveler");

  useEffect(() => {
    const storedUser = window.localStorage.getItem("loggedInUser");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.fullName || parsedUser.name || "Traveler");
      } catch (error) {
        console.error(error);
      }
    }

    fetchFlights()
      .then((data) => {
        setFlights(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setBookingMessage("Unable to load flights from the backend.");
        setLoading(false);
      });
  }, []);

  const handleBooking = async (flightNumber) => {
    try {
      const response = await fetch("http://localhost:8080/booking/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: "Som",
          flightNumber,
        }),
      });

      if (!response.ok) {
        throw new Error(`Booking failed with status ${response.status}`);
      }

      setBookingMessage(`Flight ${flightNumber} booked successfully.`);
    } catch (error) {
      console.error(error);
      setBookingMessage("Booking failed.");
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <UserNavbar />
      <Chatbot userName={userName} />

      <div className="p-6">
        <h1 className="mb-2 text-2xl font-bold">Welcome back, {userName}</h1>

        <p className="mb-6 text-gray-600">What would you like to do today?</p>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <button
            type="button"
            onClick={() => setShowFlights(true)}
            className="rounded-lg bg-white p-6 text-left shadow transition hover:shadow-md"
          >
            <h2 className="mb-2 text-lg font-semibold">Book a Flight</h2>
            <p className="text-gray-600">
              Open flights added from the admin dashboard
            </p>
          </button>

          <div className="cursor-pointer rounded-lg bg-white p-6 shadow hover:shadow-md">
            <h2 className="mb-2 text-lg font-semibold">My Bookings</h2>
            <p className="text-gray-600">View your past and upcoming trips</p>
          </div>

          <div className="cursor-pointer rounded-lg bg-white p-6 shadow hover:shadow-md">
            <h2 className="mb-2 text-lg font-semibold">Profile</h2>
            <p className="text-gray-600">Manage your personal information</p>
          </div>
        </div>

        {showFlights ? (
          <section className="rounded-2xl bg-white p-6 shadow">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="mb-1 text-xl font-semibold">Available Flights</h2>
                <p className="text-sm text-gray-500">
                  Browse flights created from the admin panel.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowFlights(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Hide
              </button>
            </div>

            {bookingMessage ? (
              <div className="mb-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {bookingMessage}
              </div>
            ) : null}

            {loading ? (
              <p>Loading flights...</p>
            ) : flights.length === 0 ? (
              <p>No flights available</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {flights.map((flight) => (
                  <div
                    key={flight.id || flight.flightNumber}
                    className="rounded-xl border border-amber-100 bg-amber-50 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {flight.flightNumber}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {flight.airline || "Lucky Air"}
                        </p>
                      </div>

                      <span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold text-amber-900">
                        {flight.status || "Scheduled"}
                      </span>
                    </div>

                    <p className="mt-4 text-gray-700">
                      {flight.source || flight.origin || "Unknown"} to{" "}
                      {flight.destination || "Unknown"}
                    </p>

                    <div className="mt-3 space-y-1 text-sm text-gray-500">
                      <p>Aircraft: {flight.aircraftType || "Not specified"}</p>
                      <p>Departure: {flight.departureTime || "Not specified"}</p>
                      <p>Arrival: {flight.arrivalTime || "Not specified"}</p>
                      <p>Seats: {flight.seats || "Not specified"}</p>
                      <p>
                        Price:{" "}
                        {flight.price
                          ? `Rs ${flight.price}`
                          : "Available on confirmation"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleBooking(flight.flightNumber)}
                      className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        ) : null}
      </div>
    </div>
  );
}
