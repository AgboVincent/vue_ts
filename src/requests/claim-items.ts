import {request} from "./default";


export function updateClaimItemsRequest(id: number, items: Object) {
    return request({
        url: `api/admin/claims/${id}/items`,
        method: 'POST',
        data: {items}
    })
}

export function getClaimItemsRequest(id: number) {
    return request({
        url: `api/admin/claims/${id}/items`,
        method: 'GET'
    });
}