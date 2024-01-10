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
const DaysOfWeek_1 = __importDefault(require("../../../model/enum/DaysOfWeek"));
const Class_1 = require("../../../model/schema/Class");
const Matriculation_1 = require("../../../model/schema/Matriculation");
const i18n_1 = require("../../../config/i18n");
const Utils_1 = __importDefault(require("../../../utils/Utils"));
const FindClassByFilterFlowItem_1 = __importDefault(require("../../class/item/FindClassByFilterFlowItem"));
const FindMatriculationBySearchFlowItem_1 = __importDefault(require("../../matriculation/item/FindMatriculationBySearchFlowItem"));
const GetCurrentRulePaymentFlowItem_1 = __importDefault(require("./GetCurrentRulePaymentFlowItem"));
const moment = require("moment");
class CalculateRegularSalaryFlowItem {
    calculate(initDate, endDate, employee) {
        return __awaiter(this, void 0, void 0, function* () {
            const classes = yield FindClassByFilterFlowItem_1.default.find(new Class_1.ClassSearch({
                populate: 'rolePayments.employee',
                // endDateRange: [moment()],
                employee: [employee]
            }));
            var paymentClasses = [];
            for (var clazz of classes.items) {
                var paymentClass = {
                    clazz: {
                        _id: clazz._id,
                        name: clazz.description
                    }
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
                paymentClass.type = rule.typeOfPayment;
                if (rule.typeOfPayment == 'BY_HOUR') {
                    var details = new Map();
                    //calcular os dias e horarios que teve aula no periodo selecionado para pagamento
                    for (var schedulesDetail of clazz.schedulesDetails) {
                        if (schedulesDetail.often == 'ONCE') {
                            console.error((0, i18n_1.getMessage)("message.methodNotImplemented", "Pagamento de turmas com frequencia única."));
                            continue;
                            // throw new HttpError(HttpStatus.PRECONDITION_FAILED, getMessage("message.methodNotImplemented", "Pagamento de turmas com frequencia única."))
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
                            console.error((0, i18n_1.getMessage)("message.methodNotImplemented", "Pagamento de turmas com frequencia mensal."));
                            continue;
                            // throw new HttpError(HttpStatus.PRECONDITION_FAILED, getMessage("message.methodNotImplemented", "Pagamento de turmas com frequencia mensal."))
                        }
                    }
                    var mapDaysAsc = new Map([...details.entries()].sort());
                    paymentClass.hoursDetails = Array.from(mapDaysAsc, ([key, value]) => {
                        var totalInMinutes = (value * 60);
                        var hours = Math.trunc(totalInMinutes / 60) | 0;
                        var minutes = (totalInMinutes % 60) | 0;
                        var time = moment.utc().hours(hours).minutes(minutes).format("HH:mm");
                        return {
                            day: key,
                            hoursFactor: value,
                            hourValue: rule.paymentValue,
                            hoursLabel: time,
                            total: Utils_1.default.round(value * rule.paymentValue)
                        };
                    });
                    paymentClass.total = paymentClass.hoursDetails.reduce((acc, day) => { return acc + Number(day.total); }, 0);
                }
                else if (rule.typeOfPayment == 'BY_PERCENT') {
                    // PEGAR TOTAL DE ALUNOS MATRICULADOS NAS TURMAS
                    var classesSkus = matriculations.items.flatMap((matriculation) => matriculation.clazzesSkus)
                        .filter((classSku) => classSku.clazz._id.equals(clazz._id));
                    var totalValueOfMatriculation = classesSkus.reduce((acc, classSku) => { return acc + classSku.totalValue; }, 0);
                    paymentClass.percentDetails = {
                        quantityOfMatriculation: matriculations.total,
                        percent: rule.paymentValue,
                        baseValue: totalValueOfMatriculation,
                        total: Utils_1.default.round((totalValueOfMatriculation * rule.paymentValue) / 10000)
                    };
                    paymentClass.total = paymentClass.percentDetails.total;
                }
                paymentClasses.push(paymentClass);
            }
            return paymentClasses;
            // total: paymentClasses: PaymentClass[].reduce((acc, paymentClass) => { return acc + paymentClass.totalOfClass }, 0)
            // }
        });
    }
}
exports.default = new CalculateRegularSalaryFlowItem;
