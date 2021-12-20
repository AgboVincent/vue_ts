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
