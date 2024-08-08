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

const axiosGet = async (path: string) => {
    return await axios.get(path, configAuthen())
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            if (error.response.status === 401) {
                window.location.href = "/login"
            }
            alert(error?.response?.data.message.join(" , "))
            return error
        });
}

const axiosPost = async (path: string, body: any) => {
    return await axios.post(path, body, configAuthen())
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log("error--> ", error)
            if (error.response.status === 401) {
                window.location.href = "/login"
            }
            // const mapValidation = error?.response?.data.message.map((item: any) => {
            //     return `<li>${item}</li>`;
            // });
            // alert(mapValidation)
            alert(error?.response?.data.message.join(" , "))
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
            alert(error?.response?.data.message.join(" , "))
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
            alert(error?.response?.data.message.join(" , "))
            return error
        });
}


export { axiosGet, axiosPost, axiosPatch, axiosDelete }