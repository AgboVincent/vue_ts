import {request} from "./default";

export function getClaimsRequest(page = 1, query = null, status = null) {
    return request({
        url: '/api/admin/claims',
        params: {
            status, page, query
        }
    })
}

export function getClaimRequest(claimId: number) {
    return request({
        url: `/api/admin/claims/${claimId}`
    })
}

export function approveClaimItemRequest(claimId, itemId: number) {
    return request({
        method: "PATCH",
        url: `api/admin/claims/${claimId}/${itemId}/approve`
    })
}

export function rejectClaimItemRequest(claimId, itemId: number) {
    return request({
        method: "PATCH",
        url: `api/admin/claims/${claimId}/${itemId}/reject`
    })
}

export function updateClaimItemRequest(claimId, itemId: number, amount: number, comment?: string) {
    return request({
        url: `api/admin/claims/${claimId}/${itemId}/update`,
        data: {amount, comment},
        method: "PATCH"
    })
}
