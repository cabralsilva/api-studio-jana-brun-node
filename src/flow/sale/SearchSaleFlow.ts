import { CrudFlow } from "c2-mongoose";
import { Request, Response } from "express";
import { OK } from "http-status";
import Database from "../../config/Database";
import { Http } from "../../config/Http";
import { ISale, SaleRepository, SaleSearch } from "../../model/schema/ISale";

class SearchSaleFlow extends Http {

  private crudSale = new CrudFlow<ISale>(SaleRepository)

  async search(request: Request, response: Response): Promise<any> {
    try {
      const search = { ...request.query }
      this.crudSale.prepareSearch(new SaleSearch(search))
      let response = await this.crudSale.find({})
      return [OK, response]
    } catch (error: any) {
      const errorAux = Database.convertErrorToHttpError(error)
      this.tryError(errorAux)
    }
  }
}
export default new SearchSaleFlow
