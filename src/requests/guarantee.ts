import { request } from "./default";


export function getGuaranteeTypesRequest() {
    return request({
        url: 'api/admin/claims/policy/guarantee-types'
    })
}

export function saveGuaranteesRequest(policyId: number, data: Array<number>) {
    return request({
        url: `api/admin/policies/${policyId}/guarantees`,
        method: 'POST',
        data: {guarantees: data}
    })
}