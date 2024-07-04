import { axiosPost } from "./axios-service"

const _AuthApi = () => {
    return {
        authen: async(body: any) => {
           return  await axiosPost("/auth/sign-in", body)
        },
    }
}

export default _AuthApi