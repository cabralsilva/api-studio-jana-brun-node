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
const DaysOfWeek_1 = require("../../model/enum/DaysOfWeek");
const FlowHttp_1 = require("../../model/FlowHttp");
const Class_1 = require("../../model/schema/Class");
const Matriculation_1 = require("../../model/schema/Matriculation");
const StringUtils_1 = require("../../utils/StringUtils");
const Utils_1 = require("../../utils/Utils");
const FindClassByFilterFlowItem_1 = require("../class/item/FindClassByFilterFlowItem");
const GetEmployeeByIdFlowItem_1 = require("../employee/item/GetEmployeeByIdFlowItem");
const FindMatriculationBySearchFlowItem_1 = require("../matriculation/item/FindMatriculationBySearchFlowItem");
const GetCurrentRulePaymentFlowItem_1 = require("./item/GetCurrentRulePaymentFlowItem");
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
                var variableSalary = (requestPayroll === null || requestPayroll === void 0 ? void 0 : requestPayroll.variablePayroll) ?
                    yield this.calcVariableSalary(moment(requestPayroll.initDate), moment(requestPayroll.endDate), employee._id) : {};
                var regularSalary = (requestPayroll === null || requestPayroll === void 0 ? void 0 : requestPayroll.regularPayroll) ?
                    this.calcRegularSalary(requestPayroll.initDate, requestPayroll.endDate, employee.salaryValue) : {};
                var total = ((variableSalary === null || variableSalary === void 0 ? void 0 : variableSalary.total) || 0) + ((regularSalary === null || regularSalary === void 0 ? void 0 : regularSalary.total) || 0);
                var payrollDetail = {};
                payrollDetail.description = `FOLHA[${employee.person.name}] - ${moment(requestPayroll.initDate).format("DD/MM/YYYY")} até ${moment(requestPayroll.endDate).format("DD/MM/YYYY")}`;
                payrollDetail.employee = {
                    _id: employee._id,
                    name: employee.person.name
                };
                payrollDetail.baseValue = regularSalary;
                payrollDetail.variableValue = variableSalary;
                payrollDetail.total = total;
                payrollDetails.push(payrollDetail);
            }
            return payrollDetails;
        });
    }
    calcVariableSalary(initDate, endDate, employee) {
        return __awaiter(this, void 0, void 0, function* () {
            const classes = yield FindClassByFilterFlowItem_1.default.find(new Class_1.ClassSearch({
                populate: 'rolePayments.employee',
                endDateRange: [moment()],
                employee: [employee]
            }));
            var result = [];
            for (var clazz of classes.items) {
                var detailClass = {};
                detailClass.class = {
                    _id: clazz._id,
                    description: clazz.description
                };
                //somar quantidade de alunos na turma
                var matriculations = yield FindMatriculationBySearchFlowItem_1.default.find(new Matriculation_1.MatriculationSearch({
                    classes: clazz._id,
                    status: 'EFFECTIVE'
                }));
                var quantityMatriculation = matriculations.total;
                //identificar qual regra esta vigente com base na quantidade de alunos
                const rolesOfEmployee = clazz.rolePayments.filter(role => employee.equals(role.employee._id));
                var rule = yield GetCurrentRulePaymentFlowItem_1.default.get(clazz, rolesOfEmployee, quantityMatriculation);
                if (Utils_1.default.isEmpty(rule)) {
                    continue;
                }
                detailClass.type = rule.typeOfPayment;
                if (rule.typeOfPayment == 'BY_HOUR') {
                    var details = new Map();
                    //calcular os dias e horarios que teve aula no periodo selecionado para pagamento
                    for (var schedulesDetail of clazz.schedulesDetails) {
                        if (schedulesDetail.often == 'ONCE') {
                            console.error(StringUtils_1.default.message("message.methodNotImplemented", "Pagamento de turmas com frequencia única."));
                            continue;
                            // throw new HttpError(HttpStatus.PRECONDITION_FAILED, StringUtils.message("message.methodNotImplemented", "Pagamento de turmas com frequencia única."))
                            // se o dia do evento ocorreu entre o inicio e o fim
                            // var day = moment(schedulesDetail.oftenDay)
                            // if (day.isBetween(initDate, endDate)) {
                            //   //CALCULAR HORAS
                            //   // console.log('ONCE', day)
                            // }
                        }
                        else if (schedulesDetail.often == 'WEEKLY') {
                            var oftenDay = DaysOfWeek_1.default[schedulesDetail.oftenDay];
                            var current = initDate.clone();
                            while (current.isSameOrBefore(endDate)) {
                                if (current.day() == Number(oftenDay)) {
                                    var initTime = moment(schedulesDetail.beginTime, 'HH:mm');
                                    var endTime = moment(schedulesDetail.endTime, 'HH:mm');
                                    var duration = moment.duration(endTime.diff(initTime)).asHours();
                                    if (details.has(current.clone().format("YYYY-MM-DD"))) {
                                        duration += details.get(current.clone().format("YYYY-MM-DD"));
                                    }
                                    details.set(current.clone().format("YYYY-MM-DD"), duration);
                                    current.add(7, 'days');
                                    continue;
                                }
                                current.add(1, 'days');
                            }
                        }
                        else if (schedulesDetail.often == 'MONTHLY') {
                            console.error(StringUtils_1.default.message("message.methodNotImplemented", "Pagamento de turmas com frequencia mensal."));
                            continue;
                            // throw new HttpError(HttpStatus.PRECONDITION_FAILED, StringUtils.message("message.methodNotImplemented", "Pagamento de turmas com frequencia mensal."))
                        }
                    }
                    var mapDaysAsc = new Map([...details.entries()].sort());
                    detailClass.details = Array.from(mapDaysAsc, ([key, value]) => {
                        var totalInMinutes = (value * 60);
                        var hours = Math.trunc(totalInMinutes / 60) | 0;
                        var minutes = (totalInMinutes % 60) | 0;
                        var time = moment.utc().hours(hours).minutes(minutes).format("HH:mm");
                        return {
                            day: key,
                            hoursFactor: value,
                            hourValue: rule.paymentValue,
                            hoursLabel: time,
                            total: (value * rule.paymentValue)
                        };
                    });
                    detailClass.totalOfClass = detailClass.details.reduce((acc, day) => { return acc + day.total; }, 0);
                }
                else if (rule.typeOfPayment == 'BY_PERCENT') {
                    // PEGAR TOTAL DE ALUNOS MATRICULADOS NAS TURMAS
                    var classesSkus = matriculations.items.flatMap((matriculation) => matriculation.clazzesSkus)
                        .filter((classSku) => classSku.clazz._id.equals(clazz._id));
                    var totalValueOfMatriculation = classesSkus.reduce((acc, classSku) => { return acc + classSku.totalValue; }, 0);
                    detailClass.details = {
                        quantityOfMatriculation: matriculations.total,
                        percent: rule.paymentValue,
                        baseValue: totalValueOfMatriculation,
                        total: (totalValueOfMatriculation * rule.paymentValue) / 10000
                    };
                    detailClass.totalOfClass = detailClass.details.total;
                }
                result.push(detailClass);
            }
            return {
                classes: result,
                total: result.reduce((acc, detailClass) => { return acc + detailClass.totalOfClass; }, 0)
            };
        });
    }
    calcRegularSalary(initDate, endDate, salaryValue) {
        var details = [];
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
            details.push({
                label: `De ${firstDateOfMonth.format('DD/MM/YYYY')} até ${lastDateOfMonth.format('DD/MM/YYYY')}`,
                quantityOfDays: daysToCalcInMonth,
                total: Number(salaryInMonth.toFixed())
            });
            regularSalary += salaryInMonth;
        }
        return {
            details,
            total: Number(regularSalary.toFixed()) || 0
        };
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
