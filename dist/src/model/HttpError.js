"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    constructor(status, message, detail = null) {
        super(message);
        this.status = status;
        this.message = message;
        this.detail = detail;
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}
exports.default = HttpError;
