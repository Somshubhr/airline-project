const API_BASE_URL = "http://localhost:8080";

async function parseResponse(response) {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function fetchFlights() {
  const response = await fetch(`${API_BASE_URL}/admin/flights`);
  return parseResponse(response);
}

export async function createFlightEntry(flightData) {
  const response = await fetch(`${API_BASE_URL}/admin/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...flightData,
      seats: Number(flightData.seats),
    }),
  });

  return parseResponse(response);
}
