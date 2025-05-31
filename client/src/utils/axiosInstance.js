import axios from "axios"
import { userLogin } from "../store/userLogin"

const BASE_URL = "http://localhost:3000";
const axiosInstance = axios.create({
    baseURL: `${BASE_URL}`,
    withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = userLogin.getState().accessToken;
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config
    },
    (error) => {
        console.log("Error in axiosInstance ", error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async(error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            try {
                const response = await axios.post(`${BASE_URL}/api/auth/refresh`,{}, { withCredentials: true });
                const { accessToken } = response.data;

                userLogin.getState().setToken({ accessToken});

                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.log("Token refresh failed, logging user out")
                userLogin.getState().logout();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;