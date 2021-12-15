import { request } from "./default"

export function getExpertsRequest() {
    return request({
        url: 'api/admin/experts'
    })
}

export function addExpertToClaimRequest(claimId: number, expertId: number){
    return request({
        url: `api/admin/claims/${claimId}/experts/${expertId}`,
        method: 'POST'
    })
}

export function uploadExpertReport(claimId: number, expertId: number, formdata: FormData){
    return request({
        url: `api/admin/claims/${claimId}/experts/${expertId}/report`,
        method: 'POST',
        data: formdata
    })
}