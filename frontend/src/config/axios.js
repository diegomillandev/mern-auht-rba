import axios from 'axios';
import queryClient from "./queryClient";
import { navigate } from '../lib/navigate';

const options = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
}

const API = axios.create(options);

const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);


API.interceptors.request.use((config) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => Promise.reject(error));


API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await TokenRefreshClient.post("/auth/refresh-token", {}, { withCredentials: true });

                // Actualiza el token en headers y reintenta la request original
                const newToken = localStorage.getItem('AUTH_TOKEN');
                if (newToken) originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return API(originalRequest);
            } catch (err) {
                queryClient.clear();
                navigate("/sign-in", {
                    state: { redirectUrl: window.location.pathname },
                });
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default API;