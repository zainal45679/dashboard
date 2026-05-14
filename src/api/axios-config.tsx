import { baseUrl } from "@/utils/base-url";
import axios from "axios";

export const axiosConfig = axios.create({
    baseURL : baseUrl,
    headers :{ "content-type": "application/json"}
});

axiosConfig.interceptors.request.use( async (config) => {

    let token 
    
    if (typeof window !== "undefined"){
        token = localStorage.getItem("accessToken");
    } else {
        const {cookies} = await import("next/headers");

        const cookiesData = await cookies()

        token = cookiesData.get("accessToken")?.value;
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})
