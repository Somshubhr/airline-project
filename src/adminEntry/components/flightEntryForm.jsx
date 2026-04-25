import { useState } from "react";
import { saveFlightEntry } from "../../shared/flightStore";

const initialForm = {
  flightNumber: "",
  airline: "",
  aircraftType: "",
  origin: "",
  destination: "",
  departureTime: "",
  arrivalTime: "",
  seats: "",
  status: "Scheduled",
};

export default function FlightEntryForm() {
  const [formData, setFormData] = useState(initialForm);
  const [submittedFlight, setSubmittedFlight] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const savedFlight = saveFlightEntry(formData);
    setSubmittedFlight(savedFlight);
    setFormData(initialForm);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-700 bg-slate-800/90 p-6 shadow-xl"
      >
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-400">
            Flight Operations
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">
            Add a flight and aircraft type
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Enter the core schedule details for a new flight listing.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Flight Number
            <input
              name="flightNumber"
              value={formData.flightNumber}
              onChange={handleChange}
              placeholder="AI-203"
              className="rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-amber-400"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Airline
            <input
              name="airline"
              value={formData.airline}
              onChange={handleChange}
              placeholder="Air India"
              className="rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-amber-400"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Aircraft Type
            <input
              name="aircraftType"
              value={formData.aircraftType}
              onChange={handleChange}
              placeholder="Airbus A320"
              className="rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-amber-400"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Available Seats
            <input
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              placeholder="180"
              type="number"
              min="1"
              className="rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-amber-400"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Origin
            <input
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              placeholder="Kolkata"
              className="rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-amber-400"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Destination
            <input
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Mumbai"
              className="rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-amber-400"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Departure Time
            <input
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
              type="datetime-local"
              className="rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-amber-400"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Arrival Time
            <input
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleChange}
              type="datetime-local"
              className="rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-amber-400"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-slate-200 md:col-span-2">
            Flight Status
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-amber-400"
            >
              <option>Scheduled</option>
              <option>Boarding</option>
              <option>Delayed</option>
              <option>Cancelled</option>
            </select>
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-lg bg-amber-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-300"
          >
            Save Flight Entry
          </button>
          <button
            type="button"
            onClick={() => setFormData(initialForm)}
            className="rounded-lg border border-slate-600 px-5 py-3 font-semibold text-slate-200 transition hover:border-slate-400 hover:text-white"
          >
            Reset
          </button>
        </div>
      </form>

      <aside className="rounded-2xl border border-slate-700 bg-slate-800/80 p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-white">Latest Entry Preview</h3>
        <p className="mt-2 text-sm text-slate-400">
          {submittedFlight
            ? "Your latest submitted flight appears below."
            : "Submit the form to preview the saved flight details here."}
        </p>

        {submittedFlight ? (
          <div className="mt-6 space-y-4 rounded-xl bg-slate-900/80 p-5">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-amber-400">
                Flight
              </p>
              <p className="mt-1 text-xl font-bold text-white">
                {submittedFlight.flightNumber}
              </p>
              <p className="text-sm text-slate-400">{submittedFlight.airline}</p>
            </div>

            <div className="grid gap-4 text-sm text-slate-300">
              <p>Aircraft: {submittedFlight.aircraftType}</p>
              <p>
                Route: {submittedFlight.origin} to {submittedFlight.destination}
              </p>
              <p>Seats: {submittedFlight.seats}</p>
              <p>Status: {submittedFlight.status}</p>
              <p>Departure: {submittedFlight.departureTime}</p>
              <p>Arrival: {submittedFlight.arrivalTime}</p>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-slate-600 p-5 text-sm text-slate-500">
            No flight entry submitted yet.
          </div>
        )}
      </aside>
    </div>
  );
}
