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
const http_status_1 = require("http-status");
const HttpError_1 = require("../../../../model/HttpError");
const StringUtils_1 = require("../../../../utils/StringUtils");
const Utils_1 = require("../../../../utils/Utils");
const GetByIdFlowItem_1 = require("../../paymentCondition/item/GetByIdFlowItem");
const GetSequenceFlowItem_1 = require("./GetSequenceFlowItem");
const GetValueOfInstallmenFlowItem_1 = require("./GetValueOfInstallmenFlowItem");
const moment = require("moment");
class PrepareFinancialFlowItem {
    prepare(financialBase) {
        return __awaiter(this, void 0, void 0, function* () {
            var financials = [];
            const paymentCondition = yield GetByIdFlowItem_1.default.get(financialBase.paymentCondition);
            if (Utils_1.default.isEmpty(paymentCondition)) {
                throw new HttpError_1.default(http_status_1.NOT_ACCEPTABLE, StringUtils_1.default.message("message.response.resourceNotFound"), StringUtils_1.default.message("message.paymentCondition"));
            }
            for (var installmentNumber = 1; installmentNumber <= paymentCondition.quantityInstallments; installmentNumber++) {
                var c = moment(financialBase.movimentDate);
                const financial = Object.assign(Object.assign({}, financialBase), { movimentDate: moment(financialBase.movimentDate), dueDate: moment(financialBase.dueDate).add(installmentNumber - 1, 'months'), value: GetValueOfInstallmenFlowItem_1.default.get(installmentNumber, paymentCondition.quantityInstallments, financialBase.value), installment: installmentNumber, installmentTotal: paymentCondition.quantityInstallments });
                financial.sequence = yield GetSequenceFlowItem_1.default.get(financial, (installmentNumber - 1));
                financial.description = financialBase.description || "AV-" + financial.sequence,
                    financials.push(financial);
            }
            return financials;
        });
    }
}
exports.default = new PrepareFinancialFlowItem;
