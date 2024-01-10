"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const HttpError_1 = __importDefault(require("../../../model/HttpError"));
const i18n_1 = require("../../../config/i18n");
const Utils_1 = __importDefault(require("../../../utils/Utils"));
class GetJWTFlowItem {
    get(req) {
        var _a, _b;
        const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (Utils_1.default.isEmpty(token)) {
            throw new HttpError_1.default(http_status_1.FORBIDDEN, (0, i18n_1.getMessage)("message.http.invalidRequest"));
        }
        return token;
    }
}
exports.default = new GetJWTFlowItem;
