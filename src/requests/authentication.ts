import {request} from "@/requests/default";

export function loginRequest(email: string, password: string) {
    return request({
        url: 'api/authentication/login',
        method: 'POST',
        data: {
            password, email
        }
    })
}

export function getAuthenticatedProfileRequest() {
    return request({
        url: '/api/profile'
    })
}
