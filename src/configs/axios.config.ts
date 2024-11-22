import envConfig from "@/configs/env.config";
import { getToken, setToken } from "@/utils/token";
import axios from "axios";

axios.defaults.baseURL = envConfig.serverUrl;
axios.defaults.withCredentials = true;

export const axiosJwt = axios.create({
  baseURL: envConfig.serverUrl,
  withCredentials: true,
});

axiosJwt.interceptors.request.use(
  (config) => {
    const token = getToken("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosJwt.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const {
          data: { tokens },
        } = await axios.post("/auth/refresh-token");
        setToken("token", tokens.acceessToken);
        originalRequest.headers.Authorization = `Bearer ${tokens.acceessToken}`;
        return axios(originalRequest);
      } catch (error) {
        console.log("Error: ", error);
        throw error;
      }
    }

    return Promise.reject(error);
  },
);
