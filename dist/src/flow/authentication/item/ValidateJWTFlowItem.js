"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const jwt = require("jsonwebtoken");
const Configs_1 = require("../../../config/Configs");
const HttpError_1 = require("../../../model/HttpError");
const StringUtils_1 = require("../../../utils/StringUtils");
class ValidateJWTFlowItem {
    validate(token) {
        jwt.verify(token, Configs_1.jwtSecret, (error, decode) => {
            if (error) {
                throw new HttpError_1.default(http_status_1.FORBIDDEN, StringUtils_1.default.message("message.http.invalidToken"));
            }
            const now = new Date();
            const expireDate = new Date(decode.exp);
            if (expireDate < now) {
                throw new HttpError_1.default(http_status_1.FORBIDDEN, StringUtils_1.default.message("message.http.expiredToken"));
            }
        });
    }
}
exports.default = new ValidateJWTFlowItem;
