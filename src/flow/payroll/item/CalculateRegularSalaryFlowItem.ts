import { Moment } from "moment";
import { PaymentMonthDetail, PaymentMonthly } from "../../../model/schema/Payroll";
import GetMonthsIntervalFlowItem from "./GetMonthsIntervalFlowItem.ts";

class CalculateRegularSalaryFlowItem {
  calculate(initDate: Moment, endDate: Moment, salaryValue: number): PaymentMonthly {
    var months: PaymentMonthDetail[] = []
    const arrayOfMonths = GetMonthsIntervalFlowItem.get(initDate, endDate)

    var regularSalaryTotal = 0
    for (var month of arrayOfMonths) {

      var lastDateOfMonth = month.clone().endOf('month')
      if (lastDateOfMonth.isAfter(endDate)) {
        lastDateOfMonth = endDate
      }

      var firstDateOfMonth = month.clone().startOf('month')
      if (firstDateOfMonth.isBefore(initDate)) {
        firstDateOfMonth = initDate
      }
      let daysInMonth = month.clone().daysInMonth()
      let daysToCalcInMonth = lastDateOfMonth.diff(firstDateOfMonth, 'days') + 1
      let salaryInMonth = (salaryValue / daysInMonth) * daysToCalcInMonth

      var monthDetail = {
        label: `De ${firstDateOfMonth.format('DD/MM/YYYY')} até ${lastDateOfMonth.format('DD/MM/YYYY')}`,
        quantityOfDays: daysToCalcInMonth,
        total: Number(salaryInMonth.toFixed())
      } as PaymentMonthDetail

      months.push(monthDetail)

      regularSalaryTotal += salaryInMonth
    }

    return {
      details: months,
      total: Number(regularSalaryTotal.toFixed()) || 0
    }
  }
}

export default new CalculateRegularSalaryFlowItem