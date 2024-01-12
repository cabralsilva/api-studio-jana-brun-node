import { C2Flow } from "c2-mongoose"
import { Request, Response } from "express"
import { OK } from "http-status"
import mongoose from "mongoose"
import Database from "../../config/Database"
import { Http } from "../../config/Http"
import { getMessage } from "../../config/i18n"
import { IPerson, PersonRepository } from "../../model/schema/IPerson"

class CreatePersonFlow extends Http {

  private crudPerson = new C2Flow<IPerson>(PersonRepository)

  async create(request: Request, response: Response): Promise<[number, any]> {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const payload = { ...request.body }
      const personAfter = await this.crudPerson.create(payload, { session })
      await session.commitTransaction()
      return [OK, { message: getMessage("message.registerCreatedSuccess"), ...personAfter }]
    } catch (error) {
      await session.abortTransaction()
      const errorAux = Database.convertErrorToHttpError(error)
      this.tryError(errorAux)
    } finally {
      await session.endSession()
    }
  }
}
export default new CreatePersonFlow
