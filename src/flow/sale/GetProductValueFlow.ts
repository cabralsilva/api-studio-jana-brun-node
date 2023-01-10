import mongoose from 'mongoose'
import FlowHttp from '../../model/FlowHttp'
import HttpError from '../../model/HttpError'
import { PriceTableSearch } from '../../model/schema/PriceTable'
import StringUtils from '../../utils/StringUtils'
import Utils from '../../utils/Utils'
import FindPriceTableFlowItem from '../priceTable/item/FindBySearchFlowItem'
import * as HttpStatus from "http-status"
import GetPriceFlowItem from './item/GetPriceFlowItem'

class GetProductValueFlow extends FlowHttp {

  async get(req, res) {
    try {

      var searchResultPriceTables = await FindPriceTableFlowItem.find(new PriceTableSearch(
        {
          effectiveDate: new Date(),
          orderBy: 'created_at',
          order: 'desc'
        }
      ))
      if (Utils.isEmpty(searchResultPriceTables?.items)) {
        throw new HttpError(HttpStatus.NOT_FOUND, StringUtils.message("message.response.resourceNotFound", StringUtils.message("message.priceTable")))
      }

      let priceTable = searchResultPriceTables.items[0]
      let itemPrice = GetPriceFlowItem.get(req.body, priceTable)

      if (Utils.isEmpty(itemPrice)) {
        throw new HttpError(HttpStatus.NOT_FOUND, StringUtils.message("message.response.resourceNotFound", StringUtils.message("message.priceTable")))
      }

      return itemPrice
    } catch (error) {
      this.processError(error)
    }
  }
}
export default new GetProductValueFlow
