import { axiosConfig } from "./axios-config"

export const productApi = {
    getAllProducts : async ()=>{
        return await axiosConfig("product/view");
    },
    createProduct : async (body : object)=>{
        return await axiosConfig.post("product/create", body)
    }
}