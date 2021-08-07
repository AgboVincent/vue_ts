import {request} from "./default";

export function overviewRequest() {
    return request({
        url: 'api/admin/overview'
    })
}
