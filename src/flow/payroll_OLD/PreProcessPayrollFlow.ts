import moment = require("moment")
import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import { EmployeePayment, PayrollEmployeeDetail } from "../../model/schema/IPayroll"
import GetEmployeeByIdFlowItem from "../employee/item/GetEmployeeByIdFlowItem"
import CalculateRegularSalaryFlowItem from "./item/CalculateRegularSalaryFlowItem"
import CalculateVariableSalaryFlowItem from "./item/CalculateVariableSalaryFlowItem"

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

  async buildPayrollDetail(requestPayroll: any): Promise<PayrollEmployeeDetail[]> {
    var payrollDetails: PayrollEmployeeDetail[] = []

    for (const employeeRequest of requestPayroll.employees) {
      const employee = await GetEmployeeByIdFlowItem.get(employeeRequest._id, 'person')

      var payrollEmployeeDetail: PayrollEmployeeDetail
      payrollEmployeeDetail = {
        description: `FOLHA[${employee.person.name}] - ${moment(requestPayroll.initDate).format("DD/MM/YYYY")} até ${moment(requestPayroll.endDate).format("DD/MM/YYYY")}`,
        employee: {
          _id: employee._id,
          name: employee.person.name
        },
        payments: []
      }

      if (requestPayroll?.regularPayroll) {
        var employeePaymentRegular: EmployeePayment
        employeePaymentRegular = {
          type: 'REGULAR',
          monthly: CalculateRegularSalaryFlowItem.calculate(
            moment(requestPayroll.initDate),
            moment(requestPayroll.endDate),
            employee.salaryValue)
        }
        employeePaymentRegular.total = employeePaymentRegular.monthly.total
        payrollEmployeeDetail.regularValueTotal = employeePaymentRegular.total
        payrollEmployeeDetail.payments.push(employeePaymentRegular)
      }

      if (requestPayroll?.variablePayroll) {
        var employeePaymentVariable: EmployeePayment
        employeePaymentVariable = {
          type: 'VARIABLE',
          classes: await CalculateVariableSalaryFlowItem.calculate(
            moment(requestPayroll.initDate),
            moment(requestPayroll.endDate),
            employee)
        }
        employeePaymentVariable.total = employeePaymentVariable.classes.reduce((acc, paymentClass) => { return acc + Number(paymentClass.total) }, 0)
        payrollEmployeeDetail.variableValueTotal = employeePaymentVariable.total
        payrollEmployeeDetail.payments.push(employeePaymentVariable)
      }
      payrollEmployeeDetail.total = payrollEmployeeDetail.payments.reduce((acc, payrollEmployee) => acc += Number(payrollEmployee.total), 0)
      payrollDetails.push(payrollEmployeeDetail)
    }

    return payrollDetails
  }
}
export default new PreProcessPayrollFlow
