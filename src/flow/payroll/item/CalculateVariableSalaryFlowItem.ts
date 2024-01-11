import { Moment } from "moment";
import { getMessage } from "../../../config/i18n";
import DaysOfWeek from "../../../model/enum/DaysOfWeek";
import { ClassSearchOLD } from "../../../model/schema/IClass";
import { MatriculationSearchOLD } from "../../../model/schema/IMatriculation";
import { PaymentByHourDetail, PaymentByPercentDetail, PaymentClass } from "../../../model/schema/IPayroll";
import Utils from "../../../utils/Utils";
import FindClassByFilterFlowItem from "../../class_OLD/item/FindClassByFilterFlowItem";
import FindMatriculationBySearchFlowItem from "../../matriculation/item/FindMatriculationBySearchFlowItem";
import GetCurrentRulePaymentFlowItem from "./GetCurrentRulePaymentFlowItem";
import moment = require("moment");

class CalculateRegularSalaryFlowItem {
  async calculate(initDate: Moment, endDate: Moment, employee: any): Promise<PaymentClass[]> {
    const classes = await FindClassByFilterFlowItem.find(new ClassSearchOLD({
      populate: 'rolePayments.employee',
      endDateRange: [moment()],
      employee: [employee]
    }))

    var paymentClasses: PaymentClass[] = [];

    for (var clazz of classes.items) {
      var paymentClass: PaymentClass = {
        clazz: {
          _id: clazz._id,
          name: clazz.description
        }
      }

      //somar quantidade de alunos na turma
      var matriculations = await FindMatriculationBySearchFlowItem.find(new MatriculationSearchOLD({
        classes: clazz._id,
        status: 'EFFECTIVE'
      }))
      var quantityMatriculation = matriculations.total

      //identificar qual regra esta vigente com base na quantidade de alunos
      const rolesOfEmployee = clazz.rolePayments.filter(role => employee.equals(role.employee._id))
      var rule = await GetCurrentRulePaymentFlowItem.get(clazz, rolesOfEmployee, quantityMatriculation)
      if (Utils.isEmpty(rule)) {
        continue
      }

      paymentClass.type = rule.typeOfPayment
      if (rule.typeOfPayment == 'BY_HOUR') {
        var details = new Map<String, number>();
        //calcular os dias e horarios que teve aula no periodo selecionado para pagamento
        for (var schedulesDetail of clazz.schedulesDetails) {
          if (schedulesDetail.often == 'ONCE') {
            console.error(getMessage("message.methodNotImplemented", "Pagamento de turmas com frequencia única."))
            continue;
            // throw new HttpError(HttpStatus.PRECONDITION_FAILED, getMessage("message.methodNotImplemented", "Pagamento de turmas com frequencia única."))
            // se o dia do evento ocorreu entre o inicio e o fim
            // var day = moment(schedulesDetail.oftenDay)
            // if (day.isBetween(initDate, endDate)) {
            //   //CALCULAR HORAS
            //   // console.log('ONCE', day)
            // }
          } else if (schedulesDetail.often == 'WEEKLY') {
            var oftenDay = DaysOfWeek[schedulesDetail.oftenDay]
            var current = initDate.clone();
            while (current.isSameOrBefore(endDate)) {
              if (current.day() == Number(oftenDay)) {
                var initTime = moment(schedulesDetail.beginTime, 'HH:mm')
                var endTime = moment(schedulesDetail.endTime, 'HH:mm')
                var duration = moment.duration(endTime.diff(initTime)).asHours()

                if (details.has(current.clone().format("YYYY-MM-DD"))) {
                  duration += details.get(current.clone().format("YYYY-MM-DD"))
                }
                details.set(current.clone().format("YYYY-MM-DD"), duration)
                current.add(7, 'days')
                continue
              }
              current.add(1, 'days')
            }
          } else if (schedulesDetail.often == 'MONTHLY') {
            console.error(getMessage("message.methodNotImplemented", "Pagamento de turmas com frequencia mensal."))
            continue;
            // throw new HttpError(HttpStatus.PRECONDITION_FAILED, getMessage("message.methodNotImplemented", "Pagamento de turmas com frequencia mensal."))
          }
        }

        var mapDaysAsc = new Map([...details.entries()].sort())

        paymentClass.hoursDetails = Array.from(mapDaysAsc, ([key, value]) => {
          var totalInMinutes = (value * 60)
          var hours = Math.trunc(totalInMinutes / 60) | 0
          var minutes = (totalInMinutes % 60) | 0

          var time = moment.utc().hours(hours).minutes(minutes).format("HH:mm");
          return {
            day: key,
            hoursFactor: value,
            hourValue: rule.paymentValue,
            hoursLabel: time,
            total: Utils.round(value * rule.paymentValue)
          } as unknown as PaymentByHourDetail
        }) as PaymentByHourDetail[]

        paymentClass.total = paymentClass.hoursDetails.reduce((acc, day) => { return acc + Number(day.total) }, 0)
      } else if (rule.typeOfPayment == 'BY_PERCENT') {
        // PEGAR TOTAL DE ALUNOS MATRICULADOS NAS TURMAS
        var classesSkus = matriculations.items.flatMap((matriculation: any) => matriculation.clazzesSkus)
          .filter((classSku: any) => classSku.clazz._id.equals(clazz._id))

        var totalValueOfMatriculation = classesSkus.reduce((acc: number, classSku: any) => { return acc + classSku.totalValue }, 0)
        paymentClass.percentDetails = {
          quantityOfMatriculation: matriculations.total,
          percent: rule.paymentValue,
          baseValue: totalValueOfMatriculation,
          total: Utils.round((totalValueOfMatriculation * rule.paymentValue) / 10000)
        } as PaymentByPercentDetail
        paymentClass.total = paymentClass.percentDetails.total
      }


      paymentClasses.push(paymentClass)
    }

    return paymentClasses
    // total: paymentClasses: PaymentClass[].reduce((acc, paymentClass) => { return acc + paymentClass.totalOfClass }, 0)
    // }
  }
}

export default new CalculateRegularSalaryFlowItem