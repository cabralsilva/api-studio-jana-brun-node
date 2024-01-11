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
const mongoose_1 = __importDefault(require("mongoose"));
const FlowHttp_1 = __importDefault(require("../../model/FlowHttp"));
const GetEmployeeByIdFlowItem_1 = __importDefault(require("../employee/item/GetEmployeeByIdFlowItem"));
const CalculateRegularSalaryFlowItem_1 = __importDefault(require("./item/CalculateRegularSalaryFlowItem"));
const CalculateVariableSalaryFlowItem_1 = __importDefault(require("./item/CalculateVariableSalaryFlowItem"));
class PreProcessPayrollFlow extends FlowHttp_1.default {
    preProcess(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield mongoose_1.default.startSession();
            try {
                session.startTransaction();
                yield session.commitTransaction();
                return yield this.buildPayrollDetail(req.body);
            }
            catch (error) {
                console.log(error);
                yield session.abortTransaction();
                this.processError(error);
            }
            finally {
                yield session.endSession();
            }
        });
    }
    buildPayrollDetail(requestPayroll) {
        return __awaiter(this, void 0, void 0, function* () {
            var payrollDetails = [];
            for (const employeeRequest of requestPayroll.employees) {
                const employee = yield GetEmployeeByIdFlowItem_1.default.get(employeeRequest._id, 'person');
                var payrollEmployeeDetail;
                payrollEmployeeDetail = {
                    description: `FOLHA[${employee.person.name}] - ${moment(requestPayroll.initDate).format("DD/MM/YYYY")} até ${moment(requestPayroll.endDate).format("DD/MM/YYYY")}`,
                    employee: {
                        _id: employee._id,
                        name: employee.person.name
                    },
                    payments: []
                };
                if (requestPayroll === null || requestPayroll === void 0 ? void 0 : requestPayroll.regularPayroll) {
                    var employeePaymentRegular;
                    employeePaymentRegular = {
                        type: 'REGULAR',
                        monthly: CalculateRegularSalaryFlowItem_1.default.calculate(moment(requestPayroll.initDate), moment(requestPayroll.endDate), employee.salaryValue)
                    };
                    employeePaymentRegular.total = employeePaymentRegular.monthly.total;
                    payrollEmployeeDetail.regularValueTotal = employeePaymentRegular.total;
                    payrollEmployeeDetail.payments.push(employeePaymentRegular);
                }
                if (requestPayroll === null || requestPayroll === void 0 ? void 0 : requestPayroll.variablePayroll) {
                    var employeePaymentVariable;
                    employeePaymentVariable = {
                        type: 'VARIABLE',
                        classes: yield CalculateVariableSalaryFlowItem_1.default.calculate(moment(requestPayroll.initDate), moment(requestPayroll.endDate), employee)
                    };
                    employeePaymentVariable.total = employeePaymentVariable.classes.reduce((acc, paymentClass) => { return acc + Number(paymentClass.total); }, 0);
                    payrollEmployeeDetail.variableValueTotal = employeePaymentVariable.total;
                    payrollEmployeeDetail.payments.push(employeePaymentVariable);
                }
                payrollEmployeeDetail.total = payrollEmployeeDetail.payments.reduce((acc, payrollEmployee) => acc += Number(payrollEmployee.total), 0);
                payrollDetails.push(payrollEmployeeDetail);
            }
            return payrollDetails;
        });
    }
}
exports.default = new PreProcessPayrollFlow;
