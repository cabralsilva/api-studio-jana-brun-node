import { CrudFlow } from 'c2-mongoose';
import { isEmpty } from 'c2-mongoose/dist/utils/Utils';
import { Request, Response } from "express";
import * as HttpStatus from 'http-status';
import Database from '../../config/Database';
import { Http } from '../../config/Http';
import { getMessage } from '../../config/i18n';
import HttpError from '../../model/HttpError';
import { IProduct, ProductRepository, ProductSearch } from '../../model/schema/IProduct';

class GetProductByIdFlowItem extends Http {

  // async read(req, res) {
  //   try {
  //     if (Utils.isNotEmpty(req.params?.id)) {
  //       const product = await GetByIdFlowItem.get(
  //         req.params.id, {
  //         path: 'grates',
  //         model: 'grate'
  //       });
  //       if (Utils.isEmpty(product)) {
  //         throw new HttpError(HttpStatus.NOT_FOUND, getMessage("message.registerNotFounded"))
  //       }
  //       return product
  //     }

  //     var resultSearch = await FindBySearchFlowItem.find(new ProductSearch(req.query)) as any
  //     return EnrichFindFlowItem.enrich(resultSearch)
  //   } catch (error) {
  //     this.processError(error)
  //   }
  // }

  private searcherProduct = new CrudFlow<IProduct>(ProductRepository)

  public get = async (request: Request, response: Response): Promise<[number, any]> => {

    try {

      const searcher = new ProductSearch({
        ...request.query,
        _id: request.params.id
      })
      this.searcherProduct.prepareSearch(searcher)
      const product = await this.searcherProduct.getOne({
        _id: request.params.id
      } as unknown as IProduct)

      if (isEmpty(product)) {
        throw new HttpError(HttpStatus.NOT_FOUND, getMessage("message.registerNotFounded"))
      }
      return [HttpStatus.OK, product]
    } catch (error: any) {
      const errorAux = Database.convertErrorToHttpError(error)
      this.tryError(errorAux)
    }
  }
}
export default new GetProductByIdFlowItem
