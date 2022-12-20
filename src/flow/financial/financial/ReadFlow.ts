import * as HttpStatus from 'http-status'
import FlowHttp from '../../../model/FlowHttp'
import HttpError from '../../../model/HttpError'
import { FinancialSearch } from '../../../model/schema/Financial'
import StringUtils from "../../../utils/StringUtils"
import Utils from '../../../utils/Utils'
import EnrichFindFlowItem from './item/EnrichFindFlowItem'
import FindBySearchFlowItem from "./item/FindBySearchFlowItem"
import GetByIdFlowItem from "./item/GetByIdFlowItem"

class ReadFlow extends FlowHttp {

  async read(req, res) {
    try {
      if (Utils.isNotEmpty(req.params?.id)){
        const financial = await GetByIdFlowItem.get(req.params.id);
        if (Utils.isEmpty(financial)) {
          throw new HttpError(HttpStatus.NOT_FOUND, StringUtils.message("message.registerNotFounded"))
        }
        return financial
      }

      var resultSearch = await FindBySearchFlowItem.find(new FinancialSearch(req.query)) as any
      return EnrichFindFlowItem.enrich(resultSearch)
    } catch (error) {
      this.processError(error)
    }
  }
}
export default new ReadFlow
