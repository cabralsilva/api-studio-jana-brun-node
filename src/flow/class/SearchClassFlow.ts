import { CrudFlow } from "c2-mongoose";
import { Request, Response } from "express";
import { OK } from "http-status";
import Database from "../../config/Database";
import { Http } from "../../config/Http";
import { IClass, ClassRepository, ClassSearch } from "../../model/schema/IClass";

class SearchClassFlow extends Http {

  private crudClass = new CrudFlow<IClass>(ClassRepository)

  async search(request: Request, response: Response): Promise<any> {
    try {
      const search = { ...request.query }
      this.crudClass.prepareSearch(new ClassSearch(search))
      let response = await this.crudClass.find({})
      return [OK, response]
    } catch (error: any) {
      const errorAux = Database.convertErrorToHttpError(error)
      this.tryError(errorAux)
    }
  }
}
export default new SearchClassFlow
