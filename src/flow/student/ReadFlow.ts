import * as HttpStatus from 'http-status'
import FlowHttp from '../../model/FlowHttp'
import HttpError from '../../model/HttpError'
import { StudentSearch } from '../../model/schema/IStudent'
import StringUtils from "../../utils/StringUtils"
import Utils from '../../utils/Utils'
import EnrichFindFlowItem from './item/EnrichFindFlowItem'
import FindBySearchFlowItem from "./item/FindBySearchFlowItem"
import GetByIdFlowItem from "./item/GetByIdFlowItem"

class ReadFlow extends FlowHttp {

  async read(req, res) {
    try {
      if (Utils.isNotEmpty(req.params?.id)) {
        const student = await GetByIdFlowItem.get(
          req.params.id, 
          {
            path: 'person.address',
            populate: {
              path: 'city',
              populate: {
                path: 'state'
              }
            }
          });
        if (Utils.isEmpty(student)) {
          throw new HttpError(HttpStatus.NOT_FOUND, StringUtils.message("message.registerNotFounded"))
        }
        return student
      }

      var resultSearch = await FindBySearchFlowItem.find(new StudentSearch(req.query)) as any
      return EnrichFindFlowItem.enrich(resultSearch)
    } catch (error) {
      this.processError(error)
    }
  }
}
export default new ReadFlow
