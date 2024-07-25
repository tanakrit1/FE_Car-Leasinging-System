import { axiosGet, axiosPost } from "./axios-service"

const _SaleItemApi = () => {
    return {
        search: async(body: any) => {
            return await axiosPost("/saleitem/search", body)
        },

        create: async(body: any) => {
            return await axiosPost("/saleitem/createAdvance", body)
        },

        getMaxID: async() => {
            return await axiosGet("/saleitem/maxid")
        },

        // update: async(id:string, body: any) => {
        //     return await axiosPatch(`/carInformation/${id}`, body)
        // },
    }
}

export default _SaleItemApi