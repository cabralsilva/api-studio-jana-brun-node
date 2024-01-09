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
const HttpStatus = __importStar(require("http-status"));
const HttpError_1 = __importDefault(require("../../../../model/HttpError"));
const StringUtils_1 = __importDefault(require("../../../../utils/StringUtils"));
const GetValueTotalPaidFlowItem_1 = __importDefault(require("./GetValueTotalPaidFlowItem"));
class ValidateAddPaymentFlowItem {
    validate(financial, payment) {
        var _totalPaid = GetValueTotalPaidFlowItem_1.default.get(financial, payment);
        if (_totalPaid > financial.value) {
            throw new HttpError_1.default(HttpStatus.NOT_ACCEPTABLE, StringUtils_1.default.message("message.financial.openValueLessThan"));
        }
    }
}
exports.default = new ValidateAddPaymentFlowItem;
