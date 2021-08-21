import {request} from "./default";

export function updateProfileRequest(data: {first_name: string, last_name: string, email: string}) {
    return request({
        url: 'api/profile',
        method: "patch",
        data
    })
}

export function updatePasswordRequest(currentPassword: string, newPassword: string, newPasswordConfirmation: string) {
    return request({
        url: 'api/profile/password',
        method: 'PATCH',
        data: {
            current_password: currentPassword,
            new_password: newPassword,
            new_password_confirmation: newPasswordConfirmation,
        }
    })
}
