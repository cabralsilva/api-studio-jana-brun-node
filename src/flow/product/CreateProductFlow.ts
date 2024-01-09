import { C2Flow } from "c2-mongoose"
import { Request, Response } from "express"
import { OK } from "http-status"
import mongoose from "mongoose"
import Database from "../../config/Database"
import { Http } from "../../config/Http"
import { getMessage } from "../../config/i18n"
import { IProduct, ProductRepository } from "../../model/schema/IProduct"

class CreateProductFlow extends Http {

  private crudProduct = new C2Flow<IProduct>(ProductRepository)

  async create(request: Request, response: Response): Promise<[number, any]> {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const payload = { ...request.body }

      const productAfter = await this.crudProduct.create(payload, { session, logger: false })
      await session.commitTransaction()
      return [OK, { message: getMessage("message.registerCreatedSuccess"), ...productAfter }]
    } catch (error) {
      await session.abortTransaction()
      const errorAux = Database.convertErrorToHttpError(error)
      this.tryError(errorAux)
    } finally {
      await session.endSession()
    }
  }
}
export default new CreateProductFlow
