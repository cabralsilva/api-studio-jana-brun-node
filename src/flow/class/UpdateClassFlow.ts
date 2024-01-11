import { C2Flow } from "c2-mongoose"
import { Request, Response } from "express"
import httpContext from "express-http-context"
import { OK } from "http-status"
import mongoose, { Types } from "mongoose"
import Database from "../../config/Database"
import { Http } from "../../config/Http"
import { getMessage } from "../../config/i18n"
import { IClass, ClassRepository } from "../../model/schema/IClass"

class UpdateClassFlow extends Http {

  private crudClass = new C2Flow<IClass>(ClassRepository)

  async update(request: Request, response: Response): Promise<[number, any]> {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const payload = { ...request.body }
      const clazzAfter = await this.crudClass.updateById(new Types.ObjectId(request.params.id), payload, { session, logger: false })
      await session.commitTransaction()
      return [OK, { message: getMessage("message.registerUpdatedSuccess"), ...clazzAfter }]
    } catch (error: any) {
      await session.abortTransaction()
      const errorAux = Database.convertErrorToHttpError(error)
      this.tryError(errorAux)
    } finally {
      await session.endSession()
    }
  }
}
export default new UpdateClassFlow
