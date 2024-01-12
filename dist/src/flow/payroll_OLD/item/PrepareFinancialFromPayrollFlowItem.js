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
const moment = require("moment");
const GetEmployeeByIdFlowItem_1 = __importDefault(require("../../employee/item/GetEmployeeByIdFlowItem"));
const GetSequenceFlowItem_1 = __importDefault(require("../../financial/financial/item/GetSequenceFlowItem"));
const DateUtils_1 = __importDefault(require("../../../utils/DateUtils"));
class PrepareFinancialFromPayrollFlowItem {
    prepare(payroll, employeePayroll, offset = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield GetEmployeeByIdFlowItem_1.default.get(employeePayroll.employee._id);
            var financial = {
                sequence: yield GetSequenceFlowItem_1.default.get(financial, offset),
                description: employeePayroll.description,
                movimentDate: DateUtils_1.default.stringToDateTimeUTC0(moment().format("YYYY-MM-DD")),
                dueDate: DateUtils_1.default.toDateTimeUTC0(moment(payroll.targetDate).toDate()),
                type: 'DEBIT',
                installment: 1,
                installmentTotal: 1,
                value: employeePayroll.total,
                person: employee.person
            };
            return financial;
        });
    }
}
exports.default = new PrepareFinancialFromPayrollFlowItem;
