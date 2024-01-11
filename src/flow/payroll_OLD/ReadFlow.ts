import * as HttpStatus from 'http-status'
import FlowHttp from '../../model/FlowHttp'
import HttpError from '../../model/HttpError'
import { PayrollSearchOLD } from '../../model/schema/IPayroll'
import { getMessage } from "../../config/i18n"
import Utils from '../../utils/Utils'
import EnrichFindFlowItem from './item/EnrichFindFlowItem'
import FindBySearchFlowItem from "./item/FindBySearchFlowItem"
import GetByIdFlowItem from "./item/GetByIdFlowItem"

class ReadFlow extends FlowHttp {

  async read(req, res) {
    try {
      if (Utils.isNotEmpty(req.params?.id)) {
        const payroll = await GetByIdFlowItem.get(req.params.id)
        if (Utils.isEmpty(payroll)) {
          throw new HttpError(HttpStatus.NOT_FOUND, getMessage("message.registerNotFounded"))
        }
        return payroll
      }

      var resultSearch = await FindBySearchFlowItem.find(new PayrollSearchOLD(req.query)) as any
      return EnrichFindFlowItem.enrich(resultSearch)
    } catch (error) {
      this.processError(error)
    }
  }
}
export default new ReadFlow
