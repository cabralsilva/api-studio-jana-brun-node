"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const HttpError_1 = require("../../../model/HttpError");
const StringUtils_1 = require("../../../utils/StringUtils");
const Utils_1 = require("../../../utils/Utils");
class GetJWTFlowItem {
    get(req) {
        var _a, _b;
        const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (Utils_1.default.isEmpty(token)) {
            throw new HttpError_1.default(http_status_1.FORBIDDEN, StringUtils_1.default.message("message.http.invalidRequest"));
        }
        return token;
    }
}
exports.default = new GetJWTFlowItem;
