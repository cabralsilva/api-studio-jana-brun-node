"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status");
const HttpError_1 = require("../../../../model/HttpError");
const StringUtils_1 = require("../../../../utils/StringUtils");
const GetValueTotalPaidFlowItem_1 = require("./GetValueTotalPaidFlowItem");
class ValidateAddPaymentFlowItem {
    validate(financial, payment) {
        var _totalPaid = GetValueTotalPaidFlowItem_1.default.get(financial, payment);
        if (_totalPaid > financial.value) {
            throw new HttpError_1.default(HttpStatus.NOT_ACCEPTABLE, StringUtils_1.default.message("message.financial.openValueLessThan"));
        }
    }
}
exports.default = new ValidateAddPaymentFlowItem;
