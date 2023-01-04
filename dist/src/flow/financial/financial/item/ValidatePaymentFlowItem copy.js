"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status");
const HttpError_1 = require("../../../../model/HttpError");
const StringUtils_1 = require("../../../../utils/StringUtils");
class ValidateDeleteFlowItem {
    validate(financial, payment) {
        var _totalPaid = this.getTotalPaid(financial, payment);
        if (_totalPaid > financial.value) {
            throw new HttpError_1.default(HttpStatus.NOT_ACCEPTABLE, StringUtils_1.default.message("message.financial.openValueLessThan"));
        }
    }
    getTotalPaid(financial, _payment) {
        var _totalPaid = financial.payments.reduce((acc, payment) => { return acc + payment.valuePaid; }, 0);
        return _totalPaid + (_payment === null || _payment === void 0 ? void 0 : _payment.valuePaid);
    }
}
exports.default = new ValidateDeleteFlowItem;
