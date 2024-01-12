import { C2Flow } from "c2-mongoose"
import { Request, Response } from "express"
import { OK } from "http-status"
import mongoose, { Types } from "mongoose"
import Database from "../../config/Database"
import { Http } from "../../config/Http"
import { getMessage } from "../../config/i18n"
import { IPerson, PersonRepository } from "../../model/schema/IPerson"

class DeletePersonFlow extends Http {

  private crudPerson = new C2Flow<IPerson>(PersonRepository)

  async delete(request: Request, response: Response): Promise<[number, any]> {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      await this.crudPerson.deleteById(new Types.ObjectId(request.params.id), { session, logger: false })
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
export default new DeletePersonFlow
