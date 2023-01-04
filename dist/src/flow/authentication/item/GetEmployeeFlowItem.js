"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const HttpError_1 = require("../../../model/HttpError");
const StringUtils_1 = require("../../../utils/StringUtils");
const Utils_1 = require("../../../utils/Utils");
const FindOneByModelFlowItem_1 = require("../../employee/item/FindOneByModelFlowItem");
class GetEmployeeFlowItem {
    get(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield FindOneByModelFlowItem_1.default.findOne({ email: credential.username }, undefined, 'person');
            if (Utils_1.default.isEmpty(employee)) {
                throw new HttpError_1.default(http_status_1.UNAUTHORIZED, StringUtils_1.default.message("message.http.invalidCredentials"));
            }
            return employee;
        });
    }
}
exports.default = new GetEmployeeFlowItem;
