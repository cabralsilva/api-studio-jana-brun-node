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
const GetSequenceFlowItem_1 = __importDefault(require("./GetSequenceFlowItem"));
const GetValueOfInstallmenFlowItem_1 = __importDefault(require("./GetValueOfInstallmenFlowItem"));
const moment = require("moment");
const Utils_1 = __importDefault(require("../../../../utils/Utils"));
const DateUtils_1 = __importDefault(require("../../../../utils/DateUtils"));
class BuildFinancialsByPaymentConditionFlowItem {
    build(paymentCondition, financialBase) {
        return __awaiter(this, void 0, void 0, function* () {
            var financials = [];
            for (var installmentNumber = 1; installmentNumber <= paymentCondition.quantityInstallments; installmentNumber++) {
                var dueDate = moment(financialBase.dueDate).add(installmentNumber - 1, 'months');
                if (Utils_1.default.isNotEmpty(financialBase.dayFixedOfPayment)) {
                    dueDate.set("date", financialBase.dayFixedOfPayment);
                }
                const financial = Object.assign(Object.assign({}, financialBase), { movimentDate: DateUtils_1.default.toDateTimeUTC0(moment(financialBase.movimentDate).toDate()), dueDate: DateUtils_1.default.toDateTimeUTC0(dueDate.toDate()), value: GetValueOfInstallmenFlowItem_1.default.get(installmentNumber, paymentCondition.quantityInstallments, financialBase.value), installment: installmentNumber, installmentTotal: paymentCondition.quantityInstallments });
                financial.sequence = yield GetSequenceFlowItem_1.default.get(financial, (installmentNumber - 1));
                financial.description = financialBase.description || "AV-" + financial.sequence,
                    financials.push(financial);
            }
            return financials;
        });
    }
}
exports.default = new BuildFinancialsByPaymentConditionFlowItem;
