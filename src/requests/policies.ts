import axios from "axios";
import {request} from "./default";

export function getPoliciesListRequest(page = 1, query?: string, status?: string) {
    return request({
        url: '/api/admin/policies',
        params: {
            page, query, status
        }
    })
}

export function createClaimForPolicyRequest(id: number, data: any) {
    return request({
        url: `api/admin/policies/${id}/claims`,
        method: 'post',
        data
    })
}

export function getPolicyInsurer(id: number) {
    return request({
        url: `api/admin/policies/${id}/insurer`
    })
}


export function getPurchasePolicies(page = 1){
    return request({
        url: '/api/admin/purchase/policy',
        params: {
            page
        }
    })
}


export function updateUserStatus(data: any){
    return request({
        url: '/api/admin/status/update',
        method: 'put',
        data
    })
}

export function sendUserEmail(user: any, msg:any){
    var data = {
        name: user.name,
        email: user.email,
        msg: msg
    }
    return request({
        url: 'api/admin/policy/mail',
        method: 'post',
        data
    })
}
