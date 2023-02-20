import moment = require("moment")
import * as HttpStatus from "http-status"
import mongoose from "mongoose"
import DaysOfWeek from "../../model/enum/DaysOfWeek"
import FlowHttp from "../../model/FlowHttp"
import HttpError from "../../model/HttpError"
import { ClassSearch } from "../../model/schema/Class"
import { MatriculationSearch } from "../../model/schema/Matriculation"
import StringUtils from "../../utils/StringUtils"
import Utils from "../../utils/Utils"
import FindClassByFilterFlowItem from "../class/item/FindClassByFilterFlowItem"
import GetEmployeeByIdFlowItem from "../employee/item/GetEmployeeByIdFlowItem"
import FindMatriculationBySearchFlowItem from "../matriculation/item/FindMatriculationBySearchFlowItem"
import GetCurrentRulePaymentFlowItem from "./item/GetCurrentRulePaymentFlowItem"

class PreProcessPayrollFlow extends FlowHttp {

  async preProcess(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      await session.commitTransaction()
      return await this.buildPayrollDetail(req.body)
    } catch (error) {
      console.log(error)
      await session.abortTransaction()
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }

  async buildPayrollDetail(requestPayroll: any) {
    var payrollDetails = []

    for (const employeeRequest of requestPayroll.employees) {
      const employee = await GetEmployeeByIdFlowItem.get(employeeRequest._id, 'person')

      var variableSalary = requestPayroll?.variablePayroll ?
        await this.calcVariableSalary(moment(requestPayroll.initDate), moment(requestPayroll.endDate), employee._id) : {} as any
      var regularSalary = requestPayroll?.regularPayroll ?
        this.calcRegularSalary(requestPayroll.initDate, requestPayroll.endDate, employee.salaryValue) : {} as any

      var total = (variableSalary?.total || 0) + (regularSalary?.total || 0)

      var payrollDetail = {} as any
      payrollDetail.description = `FOLHA[${employee.person.name}] - ${moment(requestPayroll.initDate).format("DD/MM/YYYY")} até ${moment(requestPayroll.endDate).format("DD/MM/YYYY")}`
      payrollDetail.employee = {
        _id: employee._id,
        name: employee.person.name
      }
      payrollDetail.baseValue = regularSalary
      payrollDetail.variableValue = variableSalary
      payrollDetail.total = total
      payrollDetails.push(payrollDetail)
    }

    return payrollDetails
  }
  async calcVariableSalary(initDate: moment.Moment, endDate: moment.Moment, employee) {
    const classes = await FindClassByFilterFlowItem.find(new ClassSearch({
      populate: 'rolePayments.employee',
      endDateRange: [moment()],
      employee: [employee]
    }))

    var result = [];

    for (var clazz of classes.items) {
      var detailClass = {} as any
      detailClass.class = {
        _id: clazz._id,
        description: clazz.description
      }

      //somar quantidade de alunos na turma
      var matriculations = await FindMatriculationBySearchFlowItem.find(new MatriculationSearch({
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

      detailClass.type = rule.typeOfPayment
      if (rule.typeOfPayment == 'BY_HOUR') {
        var details = new Map<String, number>();
        //calcular os dias e horarios que teve aula no periodo selecionado para pagamento
        for (var schedulesDetail of clazz.schedulesDetails) {
          if (schedulesDetail.often == 'ONCE') {
            console.error(StringUtils.message("message.methodNotImplemented", "Pagamento de turmas com frequencia única."))
            continue;
            // throw new HttpError(HttpStatus.PRECONDITION_FAILED, StringUtils.message("message.methodNotImplemented", "Pagamento de turmas com frequencia única."))
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
            console.error(StringUtils.message("message.methodNotImplemented", "Pagamento de turmas com frequencia mensal."))
            continue;
            // throw new HttpError(HttpStatus.PRECONDITION_FAILED, StringUtils.message("message.methodNotImplemented", "Pagamento de turmas com frequencia mensal."))
          }
        }

        var mapDaysAsc = new Map([...details.entries()].sort())

        detailClass.details = Array.from(mapDaysAsc, ([key, value]) => {
          var totalInMinutes = (value * 60)
          var hours = Math.trunc(totalInMinutes / 60) | 0
          var minutes = (totalInMinutes % 60) | 0

          var time = moment.utc().hours(hours).minutes(minutes).format("HH:mm");
          return {
            day: key,
            hoursFactor: value,
            hourValue: rule.paymentValue,
            hoursLabel: time,
            total: (value * rule.paymentValue)
          }
        })

        detailClass.totalOfClass = detailClass.details.reduce((acc, day) => { return acc + day.total }, 0)
      } else if (rule.typeOfPayment == 'BY_PERCENT') {
        // PEGAR TOTAL DE ALUNOS MATRICULADOS NAS TURMAS
        var classesSkus = matriculations.items.flatMap((matriculation: any) => matriculation.clazzesSkus)
          .filter((classSku: any) => classSku.clazz._id.equals(clazz._id))

        var totalValueOfMatriculation = classesSkus.reduce((acc: number, classSku: any) => { return acc + classSku.totalValue }, 0)
        detailClass.details = {
          quantityOfMatriculation: matriculations.total,
          percent: rule.paymentValue,
          baseValue: totalValueOfMatriculation,
          total: (totalValueOfMatriculation * rule.paymentValue) / 10000
        }
        detailClass.totalOfClass = detailClass.details.total
      }


      result.push(detailClass)
    }

    return {
      classes: result,
      total: result.reduce((acc, detailClass) => { return acc + detailClass.totalOfClass }, 0)
    }
  }

  calcRegularSalary(initDate, endDate, salaryValue): any {

    var details = [];
    const arrayOfMonths = this.getIntervalMonths(initDate, endDate)

    var regularSalary = 0
    for (var month of arrayOfMonths) {

      var lastDateOfMonth = moment(month).endOf('month')
      if (lastDateOfMonth.isAfter(moment(endDate))) {
        lastDateOfMonth = moment(endDate)
      }

      var firstDateOfMonth = month.startOf('month')
      if (firstDateOfMonth.isBefore(moment(initDate))) {
        firstDateOfMonth = moment(initDate)
      }
      let daysInMonth = month.daysInMonth()
      let daysToCalcInMonth = lastDateOfMonth.diff(firstDateOfMonth, 'days') + 1
      let salaryInMonth = (salaryValue / daysInMonth) * daysToCalcInMonth

      details.push({
        label: `De ${firstDateOfMonth.format('DD/MM/YYYY')} até ${lastDateOfMonth.format('DD/MM/YYYY')}`,
        quantityOfDays: daysToCalcInMonth,
        total: Number(salaryInMonth.toFixed())
      })

      regularSalary += salaryInMonth
    }
    return {
      details,
      total: Number(regularSalary.toFixed()) || 0
    }
  }

  getIntervalMonths(initDate, endDate): Array<moment.Moment> {
    var arrayOfMonths = [];
    var currentMonth = moment(initDate).set("date", 1)
    var lastMonth = moment(endDate)
    do {
      arrayOfMonths.push(currentMonth)
      currentMonth = moment(currentMonth).add(1, 'month')
    }
    while (currentMonth.isBefore(lastMonth))

    return arrayOfMonths
  }
}
export default new PreProcessPayrollFlow
