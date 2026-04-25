import AdminNavbar from "../components/adminNavbar";
import FlightEntryForm from "../components/flightEntryForm";

export default function FlightEntryPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AdminNavbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-400">
            Admin Control
          </p>
          <h1 className="mt-3 text-3xl font-bold">Flight Entry Management</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            Create a new flight record with schedule information and aircraft
            details for the admin workflow.
          </p>
        </div>

        <FlightEntryForm />
      </div>
    </div>
  );
}
