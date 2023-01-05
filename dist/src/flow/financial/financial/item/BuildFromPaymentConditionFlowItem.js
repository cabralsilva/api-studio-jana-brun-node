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
const moment = require("moment");
const GetByIdFlowItem_1 = require("../../payment-condition/item/GetByIdFlowItem");
const GetSequenceFlowItem_1 = require("./GetSequenceFlowItem");
const GetValueOfInstallmenFlowItem_1 = require("./GetValueOfInstallmenFlowItem");
class PrepareFinancialFlowItem {
    prepare(financialBase) {
        return __awaiter(this, void 0, void 0, function* () {
            var financials = [];
            var paymentCondition = yield GetByIdFlowItem_1.default.get(financialBase.paymentCondition);
            for (var installmentNumber = 1; installmentNumber <= paymentCondition.quantityOfInstallment; installmentNumber++) {
                const financial = Object.assign(Object.assign({}, financialBase), { dueDate: moment(financialBase.dueDate).add(installmentNumber - 1, 'months'), description: "AV-" + financialBase.description, value: GetValueOfInstallmenFlowItem_1.default.get(installmentNumber, paymentCondition.quantityOfInstallment, financialBase.value), installment: installmentNumber, installmentTotal: paymentCondition.quantityOfInstallment });
                financial.sequence = yield GetSequenceFlowItem_1.default.get(financial, (installmentNumber - 1));
                financials.push(financial);
            }
            return financials;
        });
    }
}
exports.default = new PrepareFinancialFlowItem;
