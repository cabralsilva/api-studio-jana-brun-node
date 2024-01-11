import { C2Flow } from "c2-mongoose"
import { Request, Response } from "express"
import { OK } from "http-status"
import mongoose, { Types } from "mongoose"
import Database from "../../config/Database"
import { Http } from "../../config/Http"
import { getMessage } from "../../config/i18n"
import { IPayroll, PayrollRepository } from "../../model/schema/IPayroll"

class DeletePayrollFlow extends Http {

  private crudPayroll = new C2Flow<IPayroll>(PayrollRepository)

  async delete(request: Request, response: Response): Promise<[number, any]> {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      await this.crudPayroll.deleteById(new Types.ObjectId(request.params.id), { session, logger: false })
      await session.commitTransaction()
      return [OK, { message: getMessage("message.registerDeletedSuccess") }]
    } catch (error: any) {
      await session.abortTransaction()
      const errorAux = Database.convertErrorToHttpError(error)
      this.tryError(errorAux)
    } finally {
      await session.endSession()
    }
  }
}
export default new DeletePayrollFlow
