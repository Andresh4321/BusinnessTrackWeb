import axios from "axios";

import { getAuthToken } from "../cookie";

const BASE_URL=process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const axiosInstance= axios.create({
    baseURL:BASE_URL,
    headers:{
        'content_Type':'application/json',
    }
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await getAuthToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;