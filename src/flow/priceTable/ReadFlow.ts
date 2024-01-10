import * as HttpStatus from 'http-status'
import FlowHttp from '../../model/FlowHttp'
import HttpError from '../../model/HttpError'
import { PriceTableSearch } from '../../model/schema/PriceTable'
import { getMessage } from "../../config/i18n"
import Utils from '../../utils/Utils'
import EnrichFindFlowItem from './item/EnrichFindFlowItem'
import FindBySearchFlowItem from "./item/FindBySearchFlowItem"
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

      var resultSearch = await FindBySearchFlowItem.find(new PriceTableSearch(req.query)) as any
      return EnrichFindFlowItem.enrich(resultSearch)
    } catch (error) {
      console.log(error)
      this.processError(error)
    }
  }
}
export default new ReadFlow
