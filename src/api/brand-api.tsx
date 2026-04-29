import { axiosConfig } from "./axios-config"

export const brandApi = {
    getAllBrands : async () => {
        return await axiosConfig.get("brand/view")
    },
    createBrand : async (body : object) => {
        return await axiosConfig.post("brand/create", body)
    }
}