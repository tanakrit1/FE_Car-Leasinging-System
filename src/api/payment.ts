import { axiosDelete, axiosPost } from "./axios-service"

const _PaymentApi = () => {
    return {
        search: async(body: any) => {
            return await axiosPost("/payment/search", body)
        },

        create: async(body: any) => {
            return await axiosPost("/payment", body)
        },

        delete: async(id: any) => {
            return await axiosDelete(`/payment/${id}`)
        },

        closeInstallment: async(body: any) => {
            return await axiosPost(`/payment/closeInstallment`, body)
        }
    }
}

export default _PaymentApi