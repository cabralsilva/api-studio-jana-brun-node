import { CrudFlow } from "c2-mongoose";
import { Request, Response } from "express";
import { OK } from "http-status";
import Database from "../../config/Database";
import { Http } from "../../config/Http";
import { IPerson, PersonRepository, PersonSearch } from "../../model/schema/IPerson";

class SearchCustomerFlow extends Http {

  private crudPerson = new CrudFlow<IPerson>(PersonRepository)

  async search(request: Request, response: Response): Promise<any> {
    try {
      const search = { ...request.query }
      this.crudPerson.prepareSearch(new PersonSearch(search))
      let response = await this.crudPerson.find({})
      return [OK, response]
    } catch (error: any) {
      const errorAux = Database.convertErrorToHttpError(error)
      this.tryError(errorAux)
    }
  }
}
export default new SearchCustomerFlow
