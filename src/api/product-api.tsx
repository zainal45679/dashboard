import { axiosConfig } from "./axios-config"

export const productApi = {
    getAllProducts : async ()=>{
        return await axiosConfig("product/view");
    }
}