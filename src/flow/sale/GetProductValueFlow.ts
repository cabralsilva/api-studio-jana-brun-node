import * as HttpStatus from "http-status"
import Database from '../../config/Database'
import { Http } from '../../config/Http'
import { getMessage } from '../../config/i18n'
import HttpError from '../../model/HttpError'
import { PriceTableSearch } from '../../model/schema/PriceTable'
import Utils from '../../utils/Utils'
import FindPriceTableFlowItem from '../priceTable/item/FindBySearchFlowItem'
import GetPriceFlowItem from './item/GetPriceFlowItem'

class GetProductValueFlow extends Http {

  async get(req, res): Promise<[number, any]>  {
    try {

      var searchResultPriceTables = await FindPriceTableFlowItem.find(new PriceTableSearch(
        {
          effectiveDate: new Date(),
          orderBy: 'created_at',
          order: 'desc'
        }
      ))
      if (Utils.isEmpty(searchResultPriceTables?.items)) {
        throw new HttpError(HttpStatus.NOT_FOUND, getMessage("message.response.resourceNotFound", getMessage("message.price")))
      }

      let priceTable = searchResultPriceTables.items[0]
      let itemPrice = GetPriceFlowItem.get(req.body, priceTable)

      if (Utils.isEmpty(itemPrice)) {
        throw new HttpError(HttpStatus.NOT_FOUND, getMessage("message.response.resourceNotFound", getMessage("message.price")))
      }

      return [HttpStatus.OK, itemPrice]
    } catch (error: any) {
      const errorAux = Database.convertErrorToHttpError(error)
      this.tryError(errorAux)
    }
  }
}

export default new GetProductValueFlow
