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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const HttpError_1 = __importDefault(require("../../../model/HttpError"));
const Utils_1 = __importDefault(require("../../../utils/Utils"));
const FindOneByModelFlowItem_1 = __importDefault(require("../../employee/item/FindOneByModelFlowItem"));
const i18n_1 = require("../../../config/i18n");
class GetEmployeeFlowItem {
    get(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield FindOneByModelFlowItem_1.default.findOne({ email: credential.username }, undefined, 'person');
            if (Utils_1.default.isEmpty(employee)) {
                throw new HttpError_1.default(http_status_1.UNAUTHORIZED, (0, i18n_1.getMessage)("message.http.invalidCredentials"));
            }
            return employee;
        });
    }
}
exports.default = new GetEmployeeFlowItem;
