import { CrudFlow } from "c2-mongoose";
import { Request, Response } from "express";
import { OK } from "http-status";
import Database from "../../config/Database";
import { Http } from "../../config/Http";
import { IStudent, StudentRepository, StudentSearch } from "../../model/schema/IStudent";

class SearchCustomerFlow extends Http {

  private crudStudent = new CrudFlow<IStudent>(StudentRepository)

  async search(request: Request, response: Response): Promise<any> {
    try {
      const search = { ...request.query }
      this.crudStudent.prepareSearch(new StudentSearch(search))
      let response = await this.crudStudent.find({})
      return [OK, response]
    } catch (error: any) {
      const errorAux = Database.convertErrorToHttpError(error)
      this.tryError(errorAux)
    }
  }
}
export default new SearchCustomerFlow
