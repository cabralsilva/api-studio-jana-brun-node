"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetValueTotalPaidFlowItem {
    get(financial, _payment) {
        var _totalPaid = financial.payments.reduce((acc, payment) => { return acc + payment.valuePaid; }, 0);
        return _totalPaid + (_payment === null || _payment === void 0 ? void 0 : _payment.valuePaid);
    }
}
exports.default = new GetValueTotalPaidFlowItem;
