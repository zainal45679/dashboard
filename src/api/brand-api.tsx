import { Tlogin } from "@/app/(dashboard)/products/_components/product-edit-form"
import { axiosConfig } from "./axios-config"

export const brandApi = {
    getAllBrands : async () => {
        return await axiosConfig.get("brand/view")
    },
    createBrand : async (body : object) => {
        return await axiosConfig.post("brand/create", body)
    },
    updateBrand : async (body : object , id : string) => {
        return await axiosConfig.put(`/brand/update/${id}`, body)
    },
    getOneBrand : async (id : string) => {
        return await axiosConfig.get(`brand/view-one/${id}`)
    },
    deleteBrand : async (id : string) => {
        return await axiosConfig.post(`brand/delete/${id}`)
    }
}