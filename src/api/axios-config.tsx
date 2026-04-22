import { baseUrl } from "@/utils/base-url";
import axios from "axios";

export const axiosConfig = axios.create({
    baseURL : baseUrl,
    headers :{ "content-type": "application/json"}
});