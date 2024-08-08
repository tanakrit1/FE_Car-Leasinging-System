import { axiosGet, axiosPatch, axiosPost } from "./axios-service"

const _SaleItemApi = () => {
    return {
        search: async(body: any) => {
            return await axiosPost("/saleitem/search", body)
        },

        create: async(body: any) => {
            return await axiosPost("/saleitem/createAdvance", body)
        },

        update: async(id:string, body: any) => {
            return await axiosPatch(`/saleitem/${id}`, body)  
        },

        getMaxID: async() => {
            return await axiosGet("/saleitem/maxid")
        },

        updateAdvance: async(body: any) => {
            return await axiosPost("/saleitem/updateAdvance", body)
        }

        // update: async(id:string, body: any) => {
        //     return await axiosPatch(`/carInformation/${id}`, body)
        // },
    }
}

export default _SaleItemApi