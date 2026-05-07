import { axiosConfig } from "./axios-config"

export const authApi = {
    loginUser: async (body : string) => {
        return await axiosConfig.post("auth/login", body)
    },
}