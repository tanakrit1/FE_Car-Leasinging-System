import { axiosDelete, axiosPatch, axiosPost } from "./axios-service"

const _CarInformationApi = () => {
    return {
        search: async(body: any) => {
            return await axiosPost("/carInformation/search", body)
        },

        create: async(body: any) => {
            return await axiosPost("/carInformation", body)
        },

        update: async(id:string, body: any) => {
            return await axiosPatch(`/carInformation/${id}`, body)
        },

        remove: async(id:string) => {
            return await axiosDelete(`/carInformation/${id}`)
        }
    }
}

export default _CarInformationApi