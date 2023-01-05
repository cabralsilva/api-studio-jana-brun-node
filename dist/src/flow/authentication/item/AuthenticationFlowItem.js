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
const crypto = require("crypto");
const http_status_1 = require("http-status");
const HttpError_1 = require("../../../model/HttpError");
const StringUtils_1 = require("../../../utils/StringUtils");
class AuthenticationFlowItem {
    authenticate(employee, password) {
        return __awaiter(this, void 0, void 0, function* () {
            var hash = crypto.pbkdf2Sync(password, employee.salt, 1000, 64, `sha512`).toString(`hex`);
            if (employee.password !== hash) {
                throw new HttpError_1.default(http_status_1.UNAUTHORIZED, StringUtils_1.default.message("message.http.invalidCredentials"));
            }
        });
    }
}
exports.default = new AuthenticationFlowItem;
