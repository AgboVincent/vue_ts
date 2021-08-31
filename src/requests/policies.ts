import {request} from "./default";

export function getPoliciesListRequest(page = 1, query?: string, status?: string) {
    return request({
        url: '/api/admin/policies',
        params: {
            page, query, status
        }
    })
}
