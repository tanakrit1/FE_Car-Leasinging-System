import { axiosPost } from "./axios-service"

const _DashboardApi = () => {
    return {
        getData: async(body: any) => {
            return await axiosPost("/payment/dashboardPay", body)
        },

        getReport: async(body: any) => {
            return await axiosPost("/payment/reportPayment", body)
        }
    }
}

export default _DashboardApi