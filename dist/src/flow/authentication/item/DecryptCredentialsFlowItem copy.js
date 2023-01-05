"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const HttpError_1 = require("../../../model/HttpError");
const StringUtils_1 = require("../../../utils/StringUtils");
class DecryptCredentialsFlowItem {
    decrypt(req) {
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            throw new HttpError_1.default(http_status_1.UNAUTHORIZED, StringUtils_1.default.message("message.http.invalidRequest"));
        }
        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii').split(":");
        return {
            username: credentials[0],
            password: credentials[1]
        };
    }
}
exports.default = new DecryptCredentialsFlowItem;
