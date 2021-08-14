import {request} from "./default";

export function getCustomerListRequest(page = 1) {
    return request({
        url: '/api/admin/customers',
        params: {
            page
        }
    })
}
