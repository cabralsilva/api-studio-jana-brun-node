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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const jwt = __importStar(require("jsonwebtoken"));
const Configs_1 = require("../../../config/Configs");
const HttpError_1 = __importDefault(require("../../../model/HttpError"));
const StringUtils_1 = __importDefault(require("../../../utils/StringUtils"));
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
