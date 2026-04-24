import { axiosConfig } from "./axios-config"

export const brandApi = {
    getAllBrands : async () => {
        return await axiosConfig.get("brand/view")
    }
}