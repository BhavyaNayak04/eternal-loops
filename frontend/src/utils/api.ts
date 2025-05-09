import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // send cookies like refreshToken
});

// Request interceptor: Attach token from localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: Refresh access token on 401
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("401 detected. Attempting token refresh...");
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        // Extract token from Authorization header
        const authHeader =
          refreshResponse.headers["authorization"] ||
          refreshResponse.headers["Authorization"];

        if (!authHeader?.startsWith("Bearer ")) {
          throw new Error("No Bearer token in Authorization header");
        }

        const newAccessToken = authHeader.split(" ")[1];
        console.log("Received new access token from header:", newAccessToken);

        // Store token and retry original request
        localStorage.setItem("token", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return API(originalRequest); // Retry request with new token
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // If refresh token is invalid (e.g., 401 again), redirect to signin
        if (
          axios.isAxiosError(refreshError) &&
          refreshError.response?.status === 401
        ) {
          localStorage.clear(); // clear all stored tokens/user data
          window.location.href = "/signin"; // redirect to signin
        }
      }
    }

    return Promise.reject(error);
  }
);

export default API;
