import * as HttpStatus from 'http-status'
import mongoose from 'mongoose'
import FlowHttp from '../../model/FlowHttp'
import HttpError from '../../model/HttpError'
import { EmployeeSearch } from '../../model/schema/Employee'
import { getMessage } from "../../config/i18n"
import Utils from '../../utils/Utils'
import EnrichFindFlowItem from './item/EnrichFindFlowItem'
import FindBySearchFlowItem from "./item/FindBySearchFlowItem"
import GetEmployeeByIdFlowItem from "./item/GetEmployeeByIdFlowItem"
import PrepareEmployeeSearchTextFlowItem from './item/PrepareEmployeeSearchTextFlowItem'

class ReadFlow extends FlowHttp {

  async read(req, res) {
    try {
      if (Utils.isNotEmpty(req.params?.id)){
        const employee = await GetEmployeeByIdFlowItem.get(
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
        if (Utils.isEmpty(employee)) {
          throw new HttpError(HttpStatus.NOT_FOUND, getMessage("message.registerNotFounded"))
        }
        return employee
      }
      
      await PrepareEmployeeSearchTextFlowItem.prepare(req)
      console.log(req.query)
      var resultSearch = await FindBySearchFlowItem.find(new EmployeeSearch(req.query)) as any
      return EnrichFindFlowItem.enrich(resultSearch)
    } catch (error) {
      this.processError(error)
    }
  }
}
export default new ReadFlow
