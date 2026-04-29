import { axiosConfig } from "./axios-config"

export const categoryApi = {
    getAllCategory : async ()=>{
        return await axiosConfig("category/view")
    },
    createCategory: async ( body : object )=>{
        return await axiosConfig.post("category/create", body);
    }
}