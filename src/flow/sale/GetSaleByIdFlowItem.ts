import { CrudFlow } from 'c2-mongoose';
import { isEmpty } from 'c2-mongoose/dist/utils/Utils';
import { Request, Response } from "express";
import * as HttpStatus from 'http-status';
import Database from '../../config/Database';
import { Http } from '../../config/Http';
import { getMessage } from '../../config/i18n';
import HttpError from '../../model/HttpError';
import { ISale, SaleRepository, SaleSearch } from '../../model/schema/ISale';

class GetSaleByIdFlowItem extends Http {

  private searcherSale = new CrudFlow<ISale>(SaleRepository)

  public get = async (request: Request, response: Response): Promise<[number, any]> => {

    try {

      const searcher = new SaleSearch({
        ...request.query,
        _id: request.params.id
      })
      this.searcherSale.prepareSearch(searcher)
      const sale = await this.searcherSale.getOne({
        _id: request.params.id
      } as unknown as ISale)

      if (isEmpty(sale)) {
        throw new HttpError(HttpStatus.NOT_FOUND, getMessage("message.registerNotFounded"))
      }
      return [HttpStatus.OK, sale]
    } catch (error: any) {
      const errorAux = Database.convertErrorToHttpError(error)
      this.tryError(errorAux)
    }
  }
}
export default new GetSaleByIdFlowItem
