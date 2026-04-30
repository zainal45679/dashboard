import { Tlogin } from "@/app/(dashboard)/products/_components/product-edit-form";
import { axiosConfig } from "./axios-config"

export const productApi = {
    getAllProducts : async ()=>{
        return await axiosConfig("product/view");
    },
    createProduct : async (body : Tlogin)=>{
        return await axiosConfig.post("product/create", body)
    },
    updateProduct : async (id : string, body: Tlogin) => {
        return await axiosConfig.put(`product/update/${id}`, body)
    },
    getOneProduct : async (id : string) => {
        return await axiosConfig.get(`product/view-one/${id}`)
    },
    deleteProduct : async (id : string) => {
        return await axiosConfig.post(`product/delete/${id}`)
    }
}