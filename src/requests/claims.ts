import {request} from "./default";
import {ClaimUpdateType, FinancialMovementType} from "../types";
import axios from "axios";

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

export function getClaimItemTypesRequest() {
    return request({
        url: `api/claims/items/types`
    })
}

export function approveClaimItemRequest(claimId: number, itemId: number) {
    return request({
        method: "PATCH",
        url: `api/admin/claims/${claimId}/${itemId}/approve`
    })
}

export function rejectClaimItemRequest(claimId: number, itemId: number) {
    return request({
        method: "PATCH",
        url: `api/admin/claims/${claimId}/${itemId}/reject`
    })
}

export function updateClaimItemRequest(claimId :number, itemId: number, amount: number, comment?: string) {
    return request({
        url: `api/admin/claims/${claimId}/${itemId}/update`,
        data: {amount, comment},
        method: "PATCH"
    })
}

export function getAllAccidentTypesRequest() {
    return request({
        url: 'api/accident/types'
    })
}

export function updateClaimRequest(claimId: number, data: ClaimUpdateType) {
    return request({
        url: `api/admin/claims/${claimId}`,
        method: 'PATCH',
        data
    })
}

export function processToInsurerRequest(claimId: number) {
    return request({
        url: `api/admin/claims/${claimId}`,
        method: 'POST'
    })
}

export function markClaimAsPaidRequest(id: number) {
    return request({
        url: `api/admin/claims/${id}/offline`,
        method: 'POST'
    })
}

export function processClaimPaymentRequest(id: number) {
    return request({
        url: `api/admin/claims/${id}`,
        method: 'POST'
    })
}

export function claimCommentsRequest(id: number, page: number) {
    return request({
        url: `api/claims/${id}/comments`,
        params: {page}
    })
}

export function addClaimCommentsRequest(id: number, comment: string) {
    return request({
        url: `api/claims/${id}/comments`,
        method: 'POST',
        data: {comment}
    })
}

export function updatetClientResponsibilityRequest(id: number, value: number) {
    return request({
        url: `api/admin/claims/${id}/responsibility`,
        method: 'POST',
        data: {value}
    })
}

export function getClientResponsibiltiesRequest(){
    return request({
        url: 'api/admin/claims/responsibilities/all',
        method: 'GET'
    })
}

export function getFinancialMovements(claim_id: number){
    return request({
        url: `api/admin/claims/${claim_id}/financial-movements`,
        method: 'GET'
    })
}

export function updateClaimsExpertsRequirementRequest(id: number, value: boolean){
    return request({
        url: `api/admin/claims/${id}/expert-requirement`,
        method: 'POST',
        data: {value}
    })
}

export function submitFinancialMovement(claim_id: number, formData: Partial<FinancialMovementType>){
    return request({
        url: `api/admin/claims/${claim_id}/financial-movements`,
        method: 'POST',
        data: {...formData}
    })
}

export function saveClaimGarageRequest(claimId: number, data: number){
    return request({
        url: `api/admin/claims/${claimId}/garage`,
        method: 'POST',
        data: {garage_id: data}
    })
}

export function getGarageRequest (claimId: number){
    return request({
        url: `api/admin/claims/${claimId}/garage`,
        method: 'GET'
    })
}

export function getCollections (page = 1){
    return request({
        url: 'api/admin/collection',
        params: {
             page
        }
    })
}


export function getCollectionRequest(id:number) {
    return request({
        url: `/api/admin/collection/${id}`,
        method: 'GET'
    })
}