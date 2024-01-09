"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const GetJWTFlowItem_1 = __importDefault(require("../../authorization/item/GetJWTFlowItem"));
const jwt = __importStar(require("jsonwebtoken"));
const Configs_1 = require("../../../config/Configs");
const GetEmployeeByIdFlowItem_1 = __importDefault(require("./GetEmployeeByIdFlowItem"));
const http_status_1 = require("http-status");
const HttpError_1 = __importDefault(require("../../../model/HttpError"));
const StringUtils_1 = __importDefault(require("../../../utils/StringUtils"));
const Utils_1 = __importDefault(require("../../../utils/Utils"));
class GetByJWTFlowItem {
    get(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = GetJWTFlowItem_1.default.get(req);
            let holder;
            jwt.verify(token, Configs_1.jwtSecret, (error, decode) => {
                if (error) {
                    throw new HttpError_1.default(http_status_1.FORBIDDEN, StringUtils_1.default.message("message.http.invalidRequest"), error);
                }
                holder = decode.holder;
            });
            let employee = yield GetEmployeeByIdFlowItem_1.default.get(holder);
            if (Utils_1.default.isEmpty(employee)) {
                throw new HttpError_1.default(http_status_1.UNAUTHORIZED, StringUtils_1.default.message("message.http.invalidCredentials"));
            }
            return employee;
        });
    }
}
exports.default = new GetByJWTFlowItem;
