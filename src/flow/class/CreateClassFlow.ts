import { C2Flow } from "c2-mongoose"
import { Request, Response } from "express"
import { OK } from "http-status"
import mongoose from "mongoose"
import Database from "../../config/Database"
import { Http } from "../../config/Http"
import { getMessage } from "../../config/i18n"
import { IClass, ClassRepository } from "../../model/schema/IClass"

class CreateClassFlow extends Http {

  private crudClass = new C2Flow<IClass>(ClassRepository)

  async create(request: Request, response: Response): Promise<[number, any]> {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const payload = { ...request.body }
      const classAfter = await this.crudClass.create(payload, { session, logger: false })
      await session.commitTransaction()
      return [OK, { message: getMessage("message.registerCreatedSuccess"), ...classAfter }]
    } catch (error) {
      await session.abortTransaction()
      const errorAux = Database.convertErrorToHttpError(error)
      this.tryError(errorAux)
    } finally {
      await session.endSession()
    }
  }
}
export default new CreateClassFlow
