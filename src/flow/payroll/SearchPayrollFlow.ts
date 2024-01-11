import { CrudFlow } from "c2-mongoose";
import { Request, Response } from "express";
import { OK } from "http-status";
import Database from "../../config/Database";
import { Http } from "../../config/Http";
import { IPayroll, PayrollRepository, PayrollSearch } from "../../model/schema/IPayroll";

class SearchPayrollFlow extends Http {

  private crudPayroll = new CrudFlow<IPayroll>(PayrollRepository)

  async search(request: Request, response: Response): Promise<any> {
    try {
      const search = { ...request.query }
      this.crudPayroll.prepareSearch(new PayrollSearch(search))
      let response = await this.crudPayroll.find({})
      return [OK, response]
    } catch (error: any) {
      const errorAux = Database.convertErrorToHttpError(error)
      this.tryError(errorAux)
    }
  }
}
export default new SearchPayrollFlow
