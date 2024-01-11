import { CrudFlow } from 'c2-mongoose';
import { isEmpty } from 'c2-mongoose/dist/utils/Utils';
import { Request, Response } from "express";
import * as HttpStatus from 'http-status';
import Database from '../../config/Database';
import { Http } from '../../config/Http';
import { getMessage } from '../../config/i18n';
import HttpError from '../../model/HttpError';
import { IPayroll, PayrollRepository, PayrollSearch } from '../../model/schema/IPayroll';

class GetPayrollByIdFlow extends Http {

  private searcherPayroll = new CrudFlow<IPayroll>(PayrollRepository)

  public get = async (request: Request, response: Response): Promise<[number, any]> => {

    try {

      const searcher = new PayrollSearch({
        ...request.query,
        _id: request.params.id
      })
      this.searcherPayroll.prepareSearch(searcher)
      const clazz = await this.searcherPayroll.getOne({
        _id: request.params.id
      } as unknown as IPayroll)

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
export default new GetPayrollByIdFlow
