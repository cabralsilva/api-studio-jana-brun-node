import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import CreatePayrollFlowItem from "./item/CreatePayrollFlowItem"
import PrepareFinancialFromPayrollFlowItem from "./item/PrepareFinancialFromPayrollFlowItem"
import CreateFinancialFlowItem from "../financial/financial/item/CreateFlowItem"

class CreatePayrollFlow extends FlowHttp {

  async create(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const payroll = await CreatePayrollFlowItem.create(req.body, session)
      const employeesPayrolls = payroll.flatMap(p => p.payrollEmployeeDetails)

      var offsetSequence = 0
      for (const employeesPayroll of employeesPayrolls) {
        var financial = await PrepareFinancialFromPayrollFlowItem.prepare(payroll[0], employeesPayroll, offsetSequence++)
        await CreateFinancialFlowItem.create(financial, session)
      }
      await session.commitTransaction()
    } catch (error) {
      console.error(error)
      await session.abortTransaction()
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }
}
export default new CreatePayrollFlow
