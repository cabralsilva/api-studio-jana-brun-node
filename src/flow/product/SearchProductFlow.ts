import { CrudFlow } from "c2-mongoose";
import { Request, Response } from "express";
import { OK } from "http-status";
import Database from "../../config/Database";
import { Http } from "../../config/Http";
import { IProduct, ProductRepository, ProductSearch } from "../../model/schema/IProduct";

class SearchProductFlow extends Http {

  private crudProduct = new CrudFlow<IProduct>(ProductRepository)

  async search(request: Request, response: Response): Promise<any> {
    try {
      const search = { ...request.query }
      this.crudProduct.prepareSearch(new ProductSearch(search))
      let response = await this.crudProduct.find({})
      return [OK, response]
    } catch (error: any) {
      const errorAux = Database.convertErrorToHttpError(error)
      this.tryError(errorAux)
    }
  }
}
export default new SearchProductFlow
