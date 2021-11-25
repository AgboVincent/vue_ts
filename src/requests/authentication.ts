import {request} from "./default";

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

export function sendForgotPasswordRequest(email: string) {
    return request({
        url: '/api/authentication/password/request',
        method: 'POST',
        data: {email}
    })
}

export function sendResetPasswordRequest(token: string, password: string, password_confirmation: string) {
    return request({
        url: '/api/authentication/password/request',
        method: 'PATCH',
        data: {token, password, password_confirmation}
    })
}
