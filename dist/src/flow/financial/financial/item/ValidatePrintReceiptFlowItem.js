"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status");
const HttpError_1 = require("../../../../model/HttpError");
const StringUtils_1 = require("../../../../utils/StringUtils");
class ValidatePrintReceiptFlowItem {
    validate(financial) {
        if (financial.status !== 'PARTIALLY' && financial.status !== 'PAID') {
            throw new HttpError_1.default(HttpStatus.NOT_ACCEPTABLE, StringUtils_1.default.message("message.financial.printReceiptPaymentsStatusIllegal"));
        }
    }
}
exports.default = new ValidatePrintReceiptFlowItem;
