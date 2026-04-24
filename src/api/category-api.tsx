import { axiosConfig } from "./axios-config"

export const categoryApi = {
    getAllCategory : async ()=>{
        return await axiosConfig("category/view")
    }
}