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
const mongoose_1 = require("mongoose");
const FlowHttp_1 = require("../../model/FlowHttp");
const Class_1 = require("../../model/schema/Class");
const FindClassByFilterFlowItem_1 = require("../class/item/FindClassByFilterFlowItem");
const GetEmployeeByIdFlowItem_1 = require("../employee/item/GetEmployeeByIdFlowItem");
class PreProcessPayrollFlow extends FlowHttp_1.default {
    preProcess(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield mongoose_1.default.startSession();
            try {
                session.startTransaction();
                yield session.commitTransaction();
                return this.buildPayrollDetail(req.body);
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
    buildPayrollDetail(requestPayroll) {
        return __awaiter(this, void 0, void 0, function* () {
            var payrollDetails = [];
            for (const employeeRequest of requestPayroll.employees) {
                const employee = yield GetEmployeeByIdFlowItem_1.default.get(employeeRequest._id, 'person');
                var payrollDetail = {};
                payrollDetail.description = `FOLHA[${employee.person.name}] - ${moment(requestPayroll.initDate).format("DD/MM/YYYY")} até ${moment(requestPayroll.endDate).format("DD/MM/YYYY")}`;
                payrollDetail.employee = {
                    _id: employee._id,
                    name: employee.person.name
                };
                payrollDetail.baseValue = requestPayroll.regularPayroll ?
                    this.calcRegularSalary(requestPayroll.initDate, requestPayroll.endDate, employee.salaryValue) : 0;
                payrollDetail.variableValue = requestPayroll.variablePayroll ?
                    this.calcVariableSalaty(requestPayroll.initDate, requestPayroll.endDate, employee._id) : 0;
                payrollDetail.finalValue = payrollDetail.baseValue + payrollDetail.variableValue;
                payrollDetails.push(payrollDetail);
            }
            return payrollDetails;
        });
    }
    calcVariableSalaty(initDate, endDate, employee) {
        return __awaiter(this, void 0, void 0, function* () {
            mongoose_1.default.set('debug', true);
            var variableSalary = 0;
            const classes = yield FindClassByFilterFlowItem_1.default.find(new Class_1.ClassSearch({
                endDateRange: [moment()],
                employee: [employee]
            }));
            const arrayOfMonths = this.getIntervalMonths(initDate, endDate);
            console.log(classes.items);
            return Number(variableSalary);
        });
    }
    calcRegularSalary(initDate, endDate, salaryValue) {
        const arrayOfMonths = this.getIntervalMonths(initDate, endDate);
        var regularSalary = 0;
        for (var month of arrayOfMonths) {
            var lastDateOfMonth = moment(month).endOf('month');
            if (lastDateOfMonth.isAfter(moment(endDate))) {
                lastDateOfMonth = moment(endDate);
            }
            var firstDateOfMonth = month.startOf('month');
            if (firstDateOfMonth.isBefore(moment(initDate))) {
                firstDateOfMonth = moment(initDate);
            }
            let daysInMonth = month.daysInMonth();
            let daysToCalcInMonth = lastDateOfMonth.diff(firstDateOfMonth, 'days') + 1;
            let salaryInMonth = (salaryValue / daysInMonth) * daysToCalcInMonth;
            console.log(month);
            console.log(daysInMonth);
            console.log(daysToCalcInMonth);
            console.log(salaryInMonth);
            regularSalary += salaryInMonth;
        }
        return Number(regularSalary.toFixed());
    }
    getIntervalMonths(initDate, endDate) {
        var arrayOfMonths = [];
        var currentMonth = moment(initDate).set("date", 1);
        var lastMonth = moment(endDate);
        do {
            arrayOfMonths.push(currentMonth);
            currentMonth = moment(currentMonth).add(1, 'month');
        } while (currentMonth.isBefore(lastMonth));
        return arrayOfMonths;
    }
}
exports.default = new PreProcessPayrollFlow;
