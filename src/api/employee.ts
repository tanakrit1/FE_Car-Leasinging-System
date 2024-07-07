import { axiosPatch, axiosPost } from "./axios-service"

const _EmployeeApi = () => {
    return {
        search: async(body: any) => {
            return await axiosPost("/user/search", body)
        },

        create: async(body: any) => {
            return await axiosPost("/user", body)
        },

        update: async(username:string, body: any) => {
            return await axiosPatch(`/user/${username}`, body)
        }
    }
}

export default _EmployeeApi