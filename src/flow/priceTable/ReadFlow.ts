import { SearcherFlow } from 'c2-mongoose'
import * as HttpStatus from 'http-status'
import { getMessage } from "../../config/i18n"
import FlowHttp from '../../model/FlowHttp'
import HttpError from '../../model/HttpError'
import { PriceTableRepository } from '../../model/schema/PriceTable'
import Utils from '../../utils/Utils'
import EnrichSearchResponseFlowItem from '../item/EnrichSearchResponseFlowItem'
import GetByIdFlowItem from "./item/GetByIdFlowItem"

class ReadFlow extends FlowHttp {

  async read(req, res) {
    try {
      if (Utils.isNotEmpty(req.params?.id)){
        const priceTable = await GetByIdFlowItem.get(
          req.params.id,
          [{
            path: 'items',
            populate: {
              path: 'product',
              populate: {
                path: 'grates'
              }
            }
          }]
          );
        if (Utils.isEmpty(priceTable)) {
          throw new HttpError(HttpStatus.NOT_FOUND, getMessage("message.registerNotFounded"))
        }
        return priceTable
      }

      const searcher = new SearcherFlow<any>(PriceTableRepository)
      searcher.prepareSearch({ ...req.query })
      var response = await searcher.search({})

      return EnrichSearchResponseFlowItem.enrich2(response)
    } catch (error) {
      console.log(error)
      this.processError(error)
    }
  }
}
export default new ReadFlow
