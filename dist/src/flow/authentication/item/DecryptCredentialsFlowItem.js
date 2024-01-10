"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const HttpError_1 = __importDefault(require("../../../model/HttpError"));
const i18n_1 = require("../../../config/i18n");
class DecryptCredentialsFlowItem {
    decrypt(req) {
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            throw new HttpError_1.default(http_status_1.UNAUTHORIZED, (0, i18n_1.getMessage)("message.http.invalidRequest"));
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
