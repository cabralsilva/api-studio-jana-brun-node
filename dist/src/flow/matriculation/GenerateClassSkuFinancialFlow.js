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
const HttpStatus = require("http-status");
const mongoose_1 = require("mongoose");
const FlowHttp_1 = require("../../model/FlowHttp");
const HttpError_1 = require("../../model/HttpError");
const StringUtils_1 = require("../../utils/StringUtils");
const Utils_1 = require("../../utils/Utils");
const BuildFinancialsByPaymentConditionFlowItem_1 = require("../financial/financial/item/BuildFinancialsByPaymentConditionFlowItem");
const GetByIdFlowItem_1 = require("./item/GetByIdFlowItem");
const CreateFlowItem_1 = require("../financial/financial/item/CreateFlowItem");
const UpdateFlowItem_1 = require("./item/UpdateFlowItem");
const moment = require("moment");
class GenerateClassSkuFinancial extends FlowHttp_1.default {
    generate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield mongoose_1.default.startSession();
            try {
                session.startTransaction();
                const matriculation = yield GetByIdFlowItem_1.default.get(req.params.id, "paymentConditionClasses student");
                if (Utils_1.default.isEmpty(matriculation)) {
                    throw new HttpError_1.default(HttpStatus.NOT_FOUND, StringUtils_1.default.message("message.response.resourceNotFound"));
                }
                if (matriculation.classSkuFinancialCreated) {
                    throw new HttpError_1.default(HttpStatus.PRECONDITION_FAILED, StringUtils_1.default.message("message.response.matriculation.financialAlreadyCreated"));
                }
                const financialBase = {
                    movimentDate: new Date(),
                    dueDate: req.body.dueDate,
                    description: `MAT-${matriculation.sequence}`,
                    value: matriculation.clazzesSkus.reduce((acc, clazzSku) => { return acc + clazzSku.totalValue; }, 0),
                    dayFixedOfPayment: moment(req.body.dueDate).date(),
                    type: 'RECEIPT',
                    person: matriculation.student.person.toString()
                };
                const financials = yield BuildFinancialsByPaymentConditionFlowItem_1.default.build(matriculation.paymentConditionClasses, financialBase);
                for (var financial of financials) {
                    yield CreateFlowItem_1.default.create(financial, session);
                }
                yield UpdateFlowItem_1.default.update(matriculation._id.toString(), { classSkuFinancialCreated: true }, session);
                yield session.commitTransaction();
            }
            catch (error) {
                yield session.abortTransaction();
                this.processError(error);
            }
            finally {
                yield session.endSession();
            }
        });
    }
}
exports.default = new GenerateClassSkuFinancial;
