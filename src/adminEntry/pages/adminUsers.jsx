import { useEffect, useState } from "react";
import AdminNavbar from "../components/adminNavbar";
import { fetchAdminUsers } from "../../shared/authApi";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchAdminUsers()
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Unable to load signed-up users from the backend.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AdminNavbar />

      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-8 rounded-3xl border border-slate-800 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-400">
            Admin Control
          </p>
          <h1 className="mt-3 text-3xl font-bold">Registered Users</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            View the users who have created accounts in the platform.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-gray-800 p-6 text-gray-300">
            Loading users...
          </div>
        ) : errorMessage ? (
          <div className="rounded-2xl bg-red-950/40 p-6 text-red-200">
            {errorMessage}
          </div>
        ) : users.length === 0 ? (
          <div className="rounded-2xl bg-gray-800 p-6 text-gray-300">
            No signed-up users found.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-800 shadow-lg">
            <div className="grid grid-cols-[1fr_1.2fr_1fr_0.8fr] gap-4 border-b border-gray-700 bg-gray-900/70 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-gray-300">
              <span>Name</span>
              <span>Email</span>
              <span>Phone</span>
              <span>Status</span>
            </div>

            <div className="divide-y divide-gray-700">
              {users.map((user) => (
                <div
                  key={user.id || user.email}
                  className="grid grid-cols-[1fr_1.2fr_1fr_0.8fr] gap-4 px-6 py-4 text-sm text-gray-200"
                >
                  <span>{user.fullName || "Not provided"}</span>
                  <span>{user.email || "No email"}</span>
                  <span>{user.phoneNumber || "Not provided"}</span>
                  <span>
                    {user.verified || user.isVerified ? "Verified" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
