import { axiosConfig } from "./axios-config"

export const bannerApi = {
    getAllBanner: async () => {
        return await axiosConfig.get("banner/view")
    }
}