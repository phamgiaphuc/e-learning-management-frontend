import envConfig from "@/configs/env.config";
import { deleteRefreshTokenCookie } from "@/utils/cookie";
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
    if (
      error.response.status === 500 &&
      ["jwt expired", "jwt malformed"].includes(error.response.data.message)
    ) {
      originalRequest._retry = true;
      try {
        const {
          data: { tokens },
        } = await axios.post("/auth/refresh-token");
        setToken("token", tokens.accessToken);
        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        console.log(error);
        deleteRefreshTokenCookie();
        window.location.replace("/login");
        throw error;
      }
    }

    return Promise.reject(error);
  },
);
