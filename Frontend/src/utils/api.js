// src/utils/api.js
const API_URL = "http://localhost:5000";

const getToken = () => localStorage.getItem("token");

const headers = (extra = {}) => ({
  "Content-Type": "application/json",
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
  ...extra
});

const handle = async (res) => {
  const raw = await res.text();
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    data = { message: raw };
  }
  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }
  return data;
};

export const api = {
  getMe: () => fetch(`${API_URL}/api/users/me`, { headers: headers() }).then(handle),
  getMyPayments: () => fetch(`${API_URL}/api/payments/my-payments`, { headers: headers() }).then(handle),
  getAllPayments: () => fetch(`${API_URL}/api/payments/all`, { headers: headers() }).then(handle),
  createBooking: (body) =>
    fetch(`${API_URL}/api/bookings`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(body)
    }).then(handle),
  getMyBookings: () => fetch(`${API_URL}/api/bookings/my`, { headers: headers() }).then(handle),
  getAllBookings: () => fetch(`${API_URL}/api/bookings/all`, { headers: headers() }).then(handle),
  updateBookingStatus: (id, status) =>
    fetch(`${API_URL}/api/bookings/${id}/status`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify({ status })
    }).then(handle),
  getAllUsers: () => fetch(`${API_URL}/api/users/all`, { headers: headers() }).then(handle)
};

export default api;