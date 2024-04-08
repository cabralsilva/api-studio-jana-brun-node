
import moment = require("moment");
import DateUtils from "../../../utils/DateUtils";
import GetEmployeeByIdFlowItem from "../../employee/item/GetEmployeeByIdFlowItem";
import GetSequenceFlowItem from "../../financial/financial/item/GetSequenceFlowItem";

class PrepareFinancialFromPayrollFlowItem {
  async prepare(payroll: any, employeePayroll: any, offset: number = 0): Promise<any> {
    const employee = await GetEmployeeByIdFlowItem.get(employeePayroll.employee._id)
    var financial = {
      sequence: await GetSequenceFlowItem.get(financial, offset),
      description: employeePayroll.description,
      movimentDate: DateUtils.stringToDateTimeUTC0(moment().format("YYYY-MM-DD")),
      dueDate: DateUtils.toDateTimeUTC0(moment(payroll.targetDate).toDate()),
      type: 'DEBIT',
      installment: 1,
      installmentTotal: 1,
      isPayroll: true,
      value: employeePayroll.total,
      person: employee.person
    }
    return financial
  }
}

export default new PrepareFinancialFromPayrollFlowItem