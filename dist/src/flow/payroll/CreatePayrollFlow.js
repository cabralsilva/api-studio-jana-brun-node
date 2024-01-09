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
const mongoose_1 = __importDefault(require("mongoose"));
const FlowHttp_1 = __importDefault(require("../../model/FlowHttp"));
const CreatePayrollFlowItem_1 = __importDefault(require("./item/CreatePayrollFlowItem"));
const PrepareFinancialFromPayrollFlowItem_1 = __importDefault(require("./item/PrepareFinancialFromPayrollFlowItem"));
const CreateFlowItem_1 = __importDefault(require("../financial/financial/item/CreateFlowItem"));
class CreatePayrollFlow extends FlowHttp_1.default {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield mongoose_1.default.startSession();
            try {
                session.startTransaction();
                const payroll = yield CreatePayrollFlowItem_1.default.create(req.body, session);
                const employeesPayrolls = payroll.flatMap(p => p.payrollEmployeeDetails);
                var offsetSequence = 0;
                for (const employeesPayroll of employeesPayrolls) {
                    var financial = yield PrepareFinancialFromPayrollFlowItem_1.default.prepare(payroll[0], employeesPayroll, offsetSequence++);
                    yield CreateFlowItem_1.default.create(financial, session);
                }
                yield session.commitTransaction();
            }
            catch (error) {
                console.error(error);
                yield session.abortTransaction();
                this.processError(error);
            }
            finally {
                yield session.endSession();
            }
        });
    }
}
exports.default = new CreatePayrollFlow;
