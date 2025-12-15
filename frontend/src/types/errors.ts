// Tipo de error para cuenta bloqueada
export interface BlockedAccountError {
    type: "ACCOUNT_BLOCKED";
    message: string;
    reason: string;
    supportEmail: string;
}

export function isBlockedAccountError(error: any): error is BlockedAccountError {
    return error && error.type === "ACCOUNT_BLOCKED";
}
