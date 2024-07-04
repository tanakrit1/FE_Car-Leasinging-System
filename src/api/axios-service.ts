import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_APP_URL_API

const configAuthen = () => {
    return {
        "Content-Type": "application/json",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    };
}

const axiosPost = async (path: string, body: any) => {
    return await axios.post(path, body, configAuthen())
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            if (error.response.status === 401) {
                window.location.href = "/login"
            }
            alert(error?.response?.data.message)
            return error?.response
        });
}

const axiosPatch = async (path: string, body: any) => {
    return await axios.patch(path, body, configAuthen())
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            if (error.response.status === 401) {
                window.location.href = "/login"
            }
            return error
        });
}

const axiosDelete = async (path: string) => {
    return await axios.delete(path, configAuthen())
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            if (error.response.status === 401) {
                window.location.href = "/login"
            }
            return error
        });
}


export { axiosPost, axiosPatch, axiosDelete }