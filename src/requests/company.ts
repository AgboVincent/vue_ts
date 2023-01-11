import {request} from "./default";
import axios from "axios";

export function overviewRequest() {
    return request({
        url: 'api/admin/overview'
    })
}

export function fetchOverviewRequest(){
    return request({
        url: 'api/admin/collection/overview'
    })
}
