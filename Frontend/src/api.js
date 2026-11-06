import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_beckend_base_URL || "http://localhost:5000"}/api`,
});

// har request mein token lagao
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// token expire ho gaya to login par bhejo
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && localStorage.getItem("token")) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// error ka message nikalne ke liye
export const errMsg = (err) =>
  err.response?.data?.message || "Kuch masla hua, dobara try karo";

export default api;