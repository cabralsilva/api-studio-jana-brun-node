import { C2Flow } from "c2-mongoose"
import { Request, Response } from "express"
import { OK } from "http-status"
import mongoose from "mongoose"
import Database from "../../config/Database"
import { Http } from "../../config/Http"
import { getMessage } from "../../config/i18n"
import { ISale, SaleRepository } from "../../model/schema/ISale"
import GenerateFinancialFromSaleFlow from "./financial/GenerateFinancialFromSaleFlow"

class CreateSaleFlow extends Http {

  private crudSale = new C2Flow<ISale>(SaleRepository)

  async create(request: Request, response: Response): Promise<[number, any]> {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const payload = { ...request.body }
      const saleAfter = await this.crudSale.create(payload, { session, logger: false }) as ISale
      await GenerateFinancialFromSaleFlow.generate(saleAfter, session)
      await session.commitTransaction()
      return [OK, { message: getMessage("message.registerCreatedSuccess"), ...saleAfter }]
    } catch (error) {
      await session.abortTransaction()
      const errorAux = Database.convertErrorToHttpError(error)
      this.tryError(errorAux)
    } finally {
      await session.endSession()
    }
  }
}
export default new CreateSaleFlow
