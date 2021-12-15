import { request } from "./default";


export function getGuaranteeTypesRequest() {
    return request({
        url: 'api/admin/claims/policy/guarantee-types'
    })
}

export function saveGuaranteesRequest(claimId: number, data: Array<number>) {
    return request({
        url: `api/admin/claims/${claimId}/guarantees`,
        method: 'POST',
        data: {guarantees: data}
    })
}