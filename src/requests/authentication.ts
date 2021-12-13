import Store from '@/store'
import {request} from "./default";

export function loginRequest(email: string, password: string) {
    return request({
        url: 'api/authentication/login',
        method: 'POST',
        data: {
            password, email
        }
    }).catch(e => {
        Store.commit('authRequestFinished', true);
        throw e;
    })
}

export function getAuthenticatedProfileRequest() {
    return request({
        url: '/api/profile'
    }).catch(e => {
        Store.commit('authRequestFinished', true);
        throw e;
    });
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
