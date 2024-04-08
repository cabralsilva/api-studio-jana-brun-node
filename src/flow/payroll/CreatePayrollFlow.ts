import { C2Flow } from "c2-mongoose"
import { Request, Response } from "express"
import { OK } from "http-status"
import mongoose from "mongoose"
import Database from "../../config/Database"
import { Http } from "../../config/Http"
import { getMessage } from "../../config/i18n"
import { IPayroll, PayrollRepository } from "../../model/schema/IPayroll"
import CreateFinancialFlowItem from "../financial/financial/item/CreateFinancialFlowItem"
import PrepareFinancialFromPayrollFlowItem from "./item/PrepareFinancialFromPayrollFlowItem"

class CreatePayrollFlow extends Http {

  private crudPayroll = new C2Flow<IPayroll>(PayrollRepository)

  async create(request: Request, response: Response): Promise<[number, any]> {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const payload = { ...request.body }
      const payrollAfter = await this.crudPayroll.create(payload, { session, logger: false })

      var offsetSequence = 0
      for (const employeesPayroll of payrollAfter.payrollEmployeeDetails) {
        var financial = await PrepareFinancialFromPayrollFlowItem.prepare(payrollAfter, employeesPayroll, offsetSequence++)
        await CreateFinancialFlowItem.create(financial, session)
      }
      await session.commitTransaction()
      return [OK, { message: getMessage("message.registerCreatedSuccess"), ...payrollAfter }]
    } catch (error) {
      await session.abortTransaction()
      const errorAux = Database.convertErrorToHttpError(error)
      this.tryError(errorAux)
    } finally {
      await session.endSession()
    }
  }
}
export default new CreatePayrollFlow
