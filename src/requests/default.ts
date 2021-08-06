import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {STATUS_CODE_UNAUTHORIZED} from "../constants";

export function request(option: AxiosRequestConfig): Promise<AxiosResponse | unknown> {
    return axios
        .request({
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + window.localStorage.getItem('auth')
            },
            ...option,
            baseURL: import.meta.env.VITE_APP_API_URL
        })
        .then((response) => response.data)
        .catch((error) => {
            if (error.response) {
                const response = error.response as AxiosResponse
                if (response.status === STATUS_CODE_UNAUTHORIZED) {
                    window.localStorage.setItem('auth', '')
                }

                throw error
            }
        })
}