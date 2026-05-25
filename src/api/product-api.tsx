import { Tlogin } from "@/app/(dashboard)/products/_components/product-edit-form";
import { axiosConfig } from "./axios-config"

export const productApi = {
    getAllProducts : async ()=>{
        return await axiosConfig("product/view");
    },
    createProduct : async (body : Tlogin)=>{
        return await axiosConfig.post("product/create", body,{
            headers: { "Content-Type" : "multipart/form-data"}
        })
    },
    updateProduct : async (id : string, body: Tlogin) => {
        return await axiosConfig.put(`product/update/${id}`, body,{
            headers: { "Content-Type" : "multipart/form-data"}
        })
    },
    getOneProduct : async (id : string) => {
        return await axiosConfig.get(`product/view-one/${id}`)
    },
    deleteProduct: async (id: string) =>{
        return await axiosConfig.post(`product/delete/${id}`)
    },
    featuredProduct : async (id : string) => {
        return await axiosConfig.post(`product/featured/${id}`)
    },
}