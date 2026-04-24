import { axiosConfig } from "./axios-config"

export const bannerApi = {
    getAllBanner: async () => {
        return await axiosConfig.get("banner/view")
    },
    createBanner: async (body: object) => {
        return await axiosConfig.post("banner/create", body)
    }
}