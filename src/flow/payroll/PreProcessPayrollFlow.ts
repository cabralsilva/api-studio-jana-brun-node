import moment = require("moment")
import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import { ClassSearch } from "../../model/schema/Class"
import { PayrollDetailModel, PayrollPreProcessRequest } from "../../model/schema/Payroll"
import FindClassByFilterFlowItem from "../class/item/FindClassByFilterFlowItem"
import GetEmployeeByIdFlowItem from "../employee/item/GetEmployeeByIdFlowItem"

class PreProcessPayrollFlow extends FlowHttp {

  async preProcess(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      await session.commitTransaction()
      return this.buildPayrollDetail(req.body)
    } catch (error) {
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
      var payrollDetail = {} as any
      payrollDetail.description = `FOLHA[${employee.person.name}] - ${moment(requestPayroll.initDate).format("DD/MM/YYYY")} até ${moment(requestPayroll.endDate).format("DD/MM/YYYY")}`
      payrollDetail.employee = {
        _id: employee._id,
        name: employee.person.name
      }
      payrollDetail.baseValue = requestPayroll.regularPayroll ?
        this.calcRegularSalary(requestPayroll.initDate, requestPayroll.endDate, employee.salaryValue) : 0
      payrollDetail.variableValue = requestPayroll.variablePayroll ?
        this.calcVariableSalaty(requestPayroll.initDate, requestPayroll.endDate, employee._id) : 0
      payrollDetail.finalValue = payrollDetail.baseValue + payrollDetail.variableValue

      payrollDetails.push(payrollDetail)
    }

    return payrollDetails
  }
  async calcVariableSalaty(initDate, endDate, employee): Promise<number> {
    mongoose.set('debug', true)
    var variableSalary = 0
    const classes = await FindClassByFilterFlowItem.find(new ClassSearch({
      endDateRange: [moment()],
      employee: [employee]
    }))
    const arrayOfMonths = this.getIntervalMonths(initDate, endDate)
    console.log(classes.items)
    return Number(variableSalary)
  }

  calcRegularSalary(initDate, endDate, salaryValue): number {
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

      console.log(month)
      console.log(daysInMonth)
      console.log(daysToCalcInMonth)
      console.log(salaryInMonth)
      regularSalary += salaryInMonth
    }
    return Number(regularSalary.toFixed())
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
