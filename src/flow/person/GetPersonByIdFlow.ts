import { CrudFlow } from 'c2-mongoose';
import { isEmpty } from 'c2-mongoose/dist/utils/Utils';
import { Request, Response } from "express";
import * as HttpStatus from 'http-status';
import Database from '../../config/Database';
import { Http } from '../../config/Http';
import { getMessage } from '../../config/i18n';
import HttpError from '../../model/HttpError';
import { IPerson, PersonRepository, PersonSearch } from '../../model/schema/IPerson';

class GetPersonByIdFlow extends Http {

  private searcherPerson = new CrudFlow<IPerson>(PersonRepository)

  public get = async (request: Request, response: Response): Promise<[number, any]> => {

    try {

      const searcher = new PersonSearch({
        ...request.query,
        _id: request.params.id
      })
      this.searcherPerson.prepareSearch(searcher)
      const clazz = await this.searcherPerson.getOne({
        _id: request.params.id
      } as unknown as IPerson)

      if (isEmpty(clazz)) {
        throw new HttpError(HttpStatus.NOT_FOUND, getMessage("message.registerNotFounded"))
      }
      return [HttpStatus.OK, clazz]
    } catch (error: any) {
      const errorAux = Database.convertErrorToHttpError(error)
      this.tryError(errorAux)
    }
  }
}
export default new GetPersonByIdFlow
