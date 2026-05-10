import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 401 redirect disabled for demo mode - API errors won't redirect to auth
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Don't redirect to auth on 401 errors for demo mode
    console.warn("API Error:", err);
    return Promise.reject(err);
  }
);

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login:    (data) => api.post("/auth/login", data),
  logout:   ()     => api.post("/auth/logout"),
  me:       ()     => api.get("/auth/me"),
  refresh:  ()     => api.post("/auth/refresh-token"),
};

// ── Trips ─────────────────────────────────────────────────────────────────────
export const tripsAPI = {
  getAll:      ()           => api.get("/trips"),
  getOne:      (id)         => api.get(`/trips/${id}`),
  create:      (data)       => api.post("/trips", data),
  update:      (id, data)   => api.put(`/trips/${id}`, data),
  remove:      (id)         => api.delete(`/trips/${id}`),
  getShared:   (shareId)    => api.get(`/trips/share/${shareId}`),
  duplicate:   (id)         => api.post(`/trips/${id}/duplicate`),
  updateBudget:(id, data)   => api.patch(`/trips/${id}/budget`, data),
  getBudget:   (id)         => api.get(`/trips/${id}/budget`),
};

// ── Stops ─────────────────────────────────────────────────────────────────────
export const stopsAPI = {
  getAll:  (tripId)       => api.get(`/trips/${tripId}/stops`),
  create:  (tripId, data) => api.post(`/trips/${tripId}/stops`, data),
  update:  (id, data)     => api.put(`/stops/${id}`, data),
  remove:  (id)           => api.delete(`/stops/${id}`),
  reorder: (items)        => api.patch("/stops/reorder", items),
};

// ── Cities ────────────────────────────────────────────────────────────────────
export const citiesAPI = {
  getAll:    (params) => api.get("/cities", { params }),
  getOne:    (id)     => api.get(`/cities/${id}`),
  getPopular:()       => api.get("/cities/popular"),
};

// ── Activities ────────────────────────────────────────────────────────────────
export const activitiesAPI = {
  getAll:         (params)         => api.get("/activities", { params }),
  getByStop:      (stopId)         => api.get(`/stops/${stopId}/activities`),
  addToStop:      (stopId, data)   => api.post(`/stops/${stopId}/activities`, data),
  removeFromStop: (stopActivityId) => api.delete(`/stop-activities/${stopActivityId}`),
};

// ── Packing ───────────────────────────────────────────────────────────────────
export const packingAPI = {
  getAll:       (params)   => api.get("/packing", { params }),
  create:       (data)     => api.post("/packing", data),
  update:       (id, data) => api.put(`/packing/${id}`, data),
  remove:       (id)       => api.delete(`/packing/${id}`),
  togglePacked: (id)       => api.patch(`/packing/${id}/toggle`),
  suggestions:  (params)   => api.get("/packing/suggestions", { params }),
};

// ── Expenses ──────────────────────────────────────────────────────────────────
export const expensesAPI = {
  getAll:    (params)     => api.get("/expenses", { params }),
  create:    (data)       => api.post("/expenses", data),
  update:    (id, data)   => api.put(`/expenses/${id}`, data),
  remove:    (id)         => api.delete(`/expenses/${id}`),
  insights:  ()           => api.get("/expenses/insights"),
};

// ── Journal ──────────────────────────────────────────────────────────────────
export const journalAPI = {
  getAll:   (params)     => api.get("/journal", { params }),
  getOne:   (id)         => api.get(`/journal/${id}`),
  create:   (data)       => api.post("/journal", data),
  update:   (id, data)   => api.put(`/journal/${id}`, data),
  remove:   (id)         => api.delete(`/journal/${id}`),
};

// ── Community ─────────────────────────────────────────────────────────────────
export const communityAPI = {
  getPosts:   (params)     => api.get("/community", { params }),
  createPost: (data)       => api.post("/community", data),
  likePost:   (id)         => api.post(`/community/${id}/like`),
  addComment: (id, data)   => api.post(`/community/${id}/comments`, data),
};

// ── Users ─────────────────────────────────────────────────────────────────────
export const usersAPI = {
  getProfile:     ()                => api.get("/users/profile"),
  updateProfile:  (data)            => api.put("/users/profile", data),
  updatePrefs:    (data)            => api.put("/users/preferences", data),
  changePassword: (data)            => api.put("/users/change-password", data),
  deleteAccount:  ()                => api.delete("/users/account"),
};

export default api;
