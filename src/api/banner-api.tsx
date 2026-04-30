import { axiosConfig } from "./axios-config"

export const bannerApi = {
    getAllBanner: async () => {
        return await axiosConfig.get("banner/view")
    },
    createBanner: async (body: object) => {
        return await axiosConfig.post("banner/create", body)
    },
    getOneBanner: async (id: string) => {
        return await axiosConfig.get(`banner/view-one/${id}`)
    },
    updateBanner: async (body: object, id: string) => {
        return await axiosConfig.put(`banner/update/${id}`, body)
    },
    deleteBanner: async (id: string) =>{
        return await axiosConfig.post(`banner/delete/${id}`)
    }
}