import { axiosConfig } from "./axios-config"

export const categoryApi = {
    getAllCategory : async ()=>{
        return await axiosConfig("category/view")
    },
    createCategory: async ( body : object )=>{
        return await axiosConfig.post("category/create", body);
    },
    getOneCategory: async (id : string)=> {
        return await axiosConfig.get(`category/view-one/${id}`)
    },
    updateCategory : async (id : string, body : object) => {
        return await axiosConfig.put(`category/update/${id}`, body)
    },
    deleteCategory : async (id : string) => {
        return await axiosConfig.post(`/category/delete/${id}`)
    }
}