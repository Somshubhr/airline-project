const STORAGE_KEY = "vocal-for-local-admin-flights";

export function getStoredFlights() {
  if (typeof window === "undefined") {
    return [];
  }

  const rawFlights = window.localStorage.getItem(STORAGE_KEY);

  if (!rawFlights) {
    return [];
  }

  try {
    const parsedFlights = JSON.parse(rawFlights);
    return Array.isArray(parsedFlights) ? parsedFlights : [];
  } catch (error) {
    console.error("Failed to parse stored flights:", error);
    return [];
  }
}

export function saveFlightEntry(flightData) {
  if (typeof window === "undefined") {
    return null;
  }

  const newFlight = {
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${flightData.flightNumber}-${Date.now()}`,
    ...flightData,
    source: flightData.origin,
    createdAt: new Date().toISOString(),
  };

  const existingFlights = getStoredFlights();
  const updatedFlights = [newFlight, ...existingFlights];

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFlights));

  return newFlight;
}
