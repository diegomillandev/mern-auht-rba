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


API.interceptors.response.use((config) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, async (error) => {
    const { config, response: { status } } = error;
    const originalRequest = config;

    if (status === 401 && !originalRequest._retry) {
        try {
            await TokenRefreshClient.get("/auth/refresh");
            return TokenRefreshClient(config);
        } catch (error) {
            queryClient.clear();
            navigate("/login", {
                state: {
                    redirectUrl: window.location.pathname,
                },
            });
        }
    }
});

export default API;