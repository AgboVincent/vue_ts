import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {STATUS_CODE_UNAUTHORIZED} from "../constants";
import Store from "../store";

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
                if (response.status === STATUS_CODE_UNAUTHORIZED && Store.state.authRequestFinished) {
                    Store.dispatch('logout');
                }

                throw error
            }
        })
}


export function fileUploadRequest(file: File){
    const form = new FormData()
    form.append('file', file)
    return request({
        url: 'api/uploads',
        method: 'post',
        data: form as any
    })
}
