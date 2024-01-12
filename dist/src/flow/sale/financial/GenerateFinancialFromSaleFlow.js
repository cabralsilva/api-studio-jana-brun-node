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
const c2_mongoose_1 = require("c2-mongoose");
const ISale_1 = require("../../../model/schema/ISale");
const CreateFinancialFlowItem_1 = __importDefault(require("../../financial/financial/item/CreateFinancialFlowItem"));
const GetSequenceFlowItem_1 = __importDefault(require("../../financial/financial/item/GetSequenceFlowItem"));
const GetValueOfInstallmenFlowItem_1 = __importDefault(require("../../financial/financial/item/GetValueOfInstallmenFlowItem"));
const GetByIdFlowItem_1 = __importDefault(require("../../financial/paymentCondition/item/GetByIdFlowItem"));
const moment = require("moment");
const DateUtils_1 = __importDefault(require("../../../utils/DateUtils"));
class GenerateFinancialFromSaleFlow {
    constructor() {
        this.crudSale = new c2_mongoose_1.C2Flow(ISale_1.SaleRepository);
    }
    generate(sale, session) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            for (const payment of sale.payments) {
                payment.installment.installments = [];
                const paymentCondition = yield GetByIdFlowItem_1.default.get(payment.installment.paymentCondition);
                let dueDateAux = moment(payment.firstPaymentDate);
                for (let sequence = 1; sequence <= paymentCondition.quantityInstallments; sequence++) {
                    const financial = {
                        movimentDate: DateUtils_1.default.stringToDateTimeUTC0(moment().format("YYYY-MM-DD")),
                        dueDate: DateUtils_1.default.toDateTimeUTC0(dueDateAux.toDate()),
                        description: `Venda - ${sale.sequence}`,
                        value: GetValueOfInstallmenFlowItem_1.default.get(sequence, paymentCondition.quantityInstallments, payment.value),
                        type: 'RECEIPT',
                        person: (_a = sale.customerData) === null || _a === void 0 ? void 0 : _a.customer,
                        installment: sequence,
                        installmentTotal: paymentCondition.quantityInstallments,
                    };
                    financial.sequence = yield GetSequenceFlowItem_1.default.get(financial, sequence - 1);
                    yield CreateFinancialFlowItem_1.default.create(financial, session);
                    payment.installment.installments.push({
                        sequence: financial.installment,
                        value: financial.value,
                        dueDate: financial.dueDate
                    });
                    dueDateAux = dueDateAux.add(1, 'months');
                }
            }
            yield this.crudSale.updateById(sale._id, sale, { session, logger: false });
        });
    }
}
exports.default = new GenerateFinancialFromSaleFlow;
