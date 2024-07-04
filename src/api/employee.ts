import { axiosPost } from "./axios-service"

const _EmployeeApi = () => {
    return {
        search: async(body: any) => {
            return await axiosPost("/user/search", body)
        },

        create: async(body: any) => {
            return await axiosPost("/user", body)
        }
    }
}

export default _EmployeeApi