import {request} from "./default";

export function getClaimsRequest(page = 1, policy = null, status = null) {
    return request({
        url: '/api/admin/claims',
        params: {
            status, page, policy
        }
    })
}
