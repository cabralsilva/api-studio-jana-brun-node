import { CrudFlow } from "c2-mongoose";
import { Request, Response } from "express";
import { OK } from "http-status";
import Database from "../../config/Database";
import { Http } from "../../config/Http";
import { IMatriculation, MatriculationRepository, MatriculationSearch } from "../../model/schema/IMatriculation";
import PrepareSearchPersonFlowItem from "./item/PrepareSearchPersonFlowItem";

class SearchMatriculationFlow extends Http {

  private searcherMatriculation = new CrudFlow<IMatriculation>(MatriculationRepository)

  async search(request: Request, response: Response): Promise<any> {
    try {
      const search = { ...request.query }
      await PrepareSearchPersonFlowItem.prepare(search)
      this.searcherMatriculation.prepareSearch(new MatriculationSearch(search))
      let response = await this.searcherMatriculation.find({})
      return [OK, response]
    } catch (error: any) {
      const errorAux = Database.convertErrorToHttpError(error)
      this.tryError(errorAux)
    }
  }
}
export default new SearchMatriculationFlow
