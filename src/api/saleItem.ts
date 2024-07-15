import { axiosPatch, axiosPost } from "./axios-service"

const _SaleItemApi = () => {
    return {
        search: async(body: any) => {
            return await axiosPost("/saleitem/search", body)
        },

        create: async(body: any) => {
            return await axiosPost("/saleitem/createAdvance", body)
        },

        update: async(id:string, body: any) => {
            return await axiosPatch(`/carInformation/${id}`, body)
        },
    }
}

export default _SaleItemApi