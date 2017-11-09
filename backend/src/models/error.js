export class Error {

    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}

export function createError(code, message) {
    return new Error(code, message);
}