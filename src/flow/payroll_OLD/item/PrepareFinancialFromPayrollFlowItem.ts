
import moment = require("moment");
import GetEmployeeByIdFlowItem from "../../employee/item/GetEmployeeByIdFlowItem";
import GetSequenceFlowItem from "../../financial/financial/item/GetSequenceFlowItem";
import DateUtils from "../../../utils/DateUtils";
import { IPayroll } from "../../../model/schema/IPayroll";

class PrepareFinancialFromPayrollFlowItem {
  async prepare(payroll: any, employeePayroll: any, offset: number = 0): Promise<any> {
    const employee = await GetEmployeeByIdFlowItem.get(employeePayroll.employee._id)
    var financial = {
      sequence: await GetSequenceFlowItem.get(financial, offset),
      description: employeePayroll.description,
      movimentDate: DateUtils.toDateTimeUTC0(new Date()),
      dueDate: DateUtils.toDateTimeUTC0(moment(payroll.targetDate).toDate()),
      type: 'DEBIT',
      installment: 1,
      installmentTotal: 1,
      value: employeePayroll.total,
      person: employee.person
    }
    return financial
  }
}

export default new PrepareFinancialFromPayrollFlowItem
