export type ClaimItemType = {
    id: number
    name: string
    status: string
    quantity: number
    amount: number
    created_at: string | Date
}

export type ClaimType = {
    "id": number,
    "status": "pending" | "approved" | "declined",
    "created_at": string | Date,
    "updated_at": string | Date,
    "user": Object,
    policy: PolicyType,
    "accident": AccidentType
    third_party: {
        full_name: string
        policy_number: string
        mobile: string
        company: string
    }
    "items": ClaimItemType
}

export type ClaimUpdateType = {
    description: string
    date_time: string
    accident_type: string
    involved_third_party: boolean
    third_party: {
        full_name: string
        mobile: string
        company: string
        policy_number: string
    }
}

export type CustomerType = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    created_at: string | Date,
    updated_at: string | Date,
    type: "broker" | "user" | "insurance",
    meta: object,
}
export type AccidentType = {
    "id": number
    description: string
    "occurred_at": string | Date
    "involved_third_party": boolean
    type: {
        id: string,
        name: string
    },
    documents: Array<AccidentDocumentType>
}
export type AccidentDocumentType = {
    id: string
    type: string
    file: FileType
}

export type FileType = {
    id: number
    mime: string
    ext: string
    path: string
    size: string
    created_at: string | Date
}
export type PolicyType = {
    "id": number,
    "number": number,
    "status": "expired" | "active",
    "type": string,
    "created_at": string | Date,
    "expires_at": string | Date,
    "company": {
        "id": number,
        "name": string
    },
    vehicle: VehicleType
}

export type VehicleType = {
    id: number
    policy_id: number
    registration_number: string
    chassis_number: string
    engine_number: string
    manufacturer: string
    model: string
    estimate: number
    color: string
    gear_type: "auto" | "manual"
    year: string
    created_at: string | Date
    updated_at: string | Date
}
