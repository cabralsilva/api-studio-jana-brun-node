"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetValueOfInstallmenFlowItem {
    get(installment, totalInstallment, totalValue) {
        var value = Number((totalValue / totalInstallment).toFixed(0));
        if (installment == totalInstallment) {
            let sumPrevious = value * (totalInstallment - 1);
            sumPrevious = Number(sumPrevious.toFixed(0));
            value = Number((totalValue - sumPrevious).toFixed(0));
        }
        return value;
    }
}
exports.default = new GetValueOfInstallmenFlowItem;
