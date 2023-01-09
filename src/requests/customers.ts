import axios from "axios";
import {request} from "./default";

export function getCustomerListRequest(page = 1) {
    return request({
        url: '/api/admin/customers',
        params: {
            page
        }
    })
}

export function getSelfInspection(page = 1, query = null, date:any) {
    let startDate = null;
    let endDate = null
    if(date){
          startDate = date.startDate;
          endDate = date.endDate;
    }  
    return request({
        url: '/api/admin/evals',
        params: {
            page, query, date, startDate, endDate
        }
    });
}

export function getSelfInspectionRequest(id: number) {
    return request({
        url: `/api/admin/inspection/${id}`
    });
}
