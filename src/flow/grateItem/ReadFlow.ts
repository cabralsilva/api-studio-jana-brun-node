import * as HttpStatus from 'http-status'
import FlowHttp from '../../model/FlowHttp'
import HttpError from '../../model/HttpError'
import { getMessage } from "../../config/i18n"
import Utils from '../../utils/Utils'
import EnrichFindFlowItem from './item/EnrichFindFlowItem'
import GetByIdFlowItem from "./item/GetByIdFlowItem"

class ReadFlow extends FlowHttp {

  async read(req, res) {
    try {
      if (Utils.isNotEmpty(req.params?.id)){
        const grateItem = await GetByIdFlowItem.get(req.params.id);
        if (Utils.isEmpty(grateItem)) {
          throw new HttpError(HttpStatus.NOT_FOUND, getMessage("message.registerNotFounded"))
        }
        return grateItem
      }
    } catch (error) {
      this.processError(error)
    }
  }
}
export default new ReadFlow
