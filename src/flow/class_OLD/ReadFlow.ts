import * as HttpStatus from 'http-status'
import FlowHttp from '../../model/FlowHttp'
import HttpError from '../../model/HttpError'
import { ClassSearchOLD } from '../../model/schema/IClass'
import { getMessage } from "../../config/i18n"
import Utils from '../../utils/Utils'
import EnrichFindFlowItem from './item/EnrichFindFlowItem'
import FindBySearchFlowItem from "./item/FindClassByFilterFlowItem"
import GetByIdFlowItem from "./item/GetByIdFlowItem"

class ReadFlow extends FlowHttp {

  async read(req, res) {
    try {
      if (Utils.isNotEmpty(req.params?.id)) {
        const clazz = await GetByIdFlowItem.get(
          req.params.id,
          [{
            path: 'rolePayments',
            populate: {
              path: 'employee',
              populate: {
                path: 'person'
              }
            },
          },
          {
            path: 'schedulesDetails',
            populate: {
              path: 'classroom'
            }
          }]);
        if (Utils.isEmpty(clazz)) {
          throw new HttpError(HttpStatus.NOT_FOUND, getMessage("message.registerNotFounded"))
        }
        return clazz
      }

      var resultSearch = await FindBySearchFlowItem.find(new ClassSearchOLD(req.query)) as any
      return EnrichFindFlowItem.enrich(resultSearch)
    } catch (error) {
      this.processError(error)
    }
  }
}
export default new ReadFlow