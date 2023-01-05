import * as HttpStatus from 'http-status'
import FlowHttp from '../../model/FlowHttp'
import HttpError from '../../model/HttpError'
import { SupplierSearch } from '../../model/schema/Supplier'
import StringUtils from "../../utils/StringUtils"
import Utils from '../../utils/Utils'
import EnrichFindFlowItem from './item/EnrichFindFlowItem'
import FindBySearchFlowItem from "./item/FindBySearchFlowItem"
import GetByIdFlowItem from "./item/GetByIdFlowItem"

class ReadFlow extends FlowHttp {

  async read(req, res) {
    try {
      if (Utils.isNotEmpty(req.params?.id)) {
        const supplier = await GetByIdFlowItem.get(
          req.params.id,
          {
            path: 'person',
            populate: {
              path: 'address',
              populate: {
                path: 'city',
                populate: {
                  path: 'state'
                }
              }
            }
          });
        if (Utils.isEmpty(supplier)) {
          throw new HttpError(HttpStatus.NOT_FOUND, StringUtils.message("message.registerNotFounded"))
        }
        return supplier
      }

      var resultSearch = await FindBySearchFlowItem.find(new SupplierSearch(req.query)) as any
      return EnrichFindFlowItem.enrich(resultSearch)
    } catch (error) {
      this.processError(error)
    }
  }
}
export default new ReadFlow
