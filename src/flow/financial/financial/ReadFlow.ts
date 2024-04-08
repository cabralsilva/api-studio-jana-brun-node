import { CrudFlow } from 'c2-mongoose'
import { Request, Response } from 'express'
import httpContext from 'express-http-context'
import * as HttpStatus from 'http-status'
import { getMessage } from "../../../config/i18n"
import FlowHttp from '../../../model/FlowHttp'
import HttpError from '../../../model/HttpError'
import AccessProfile from '../../../model/enum/AccessProfile'
import { IEmployee } from '../../../model/schema/IEmployee'
import { FinancialRepository, FinancialSearch } from '../../../model/schema/IFinancial'
import Utils from '../../../utils/Utils'
import GetByIdFlowItem from "./item/GetByIdFlowItem"

class ReadFlow extends FlowHttp {

  private searcherFinancial = new CrudFlow<any>(FinancialRepository)

  async read(req: Request, res: Response) {
    try {
      if (Utils.isNotEmpty(req.params?.id)) {
        const financial = await GetByIdFlowItem.get(req.params.id);
        if (Utils.isEmpty(financial)) {
          throw new HttpError(HttpStatus.NOT_FOUND, getMessage("message.registerNotFounded"))
        }
        return financial
      }

      const user = httpContext.get("user") as IEmployee
      if (user.accessProfile === AccessProfile.BASIC) {
        req.query.isPayroll = 'false'
      }
      const searcher = new FinancialSearch({
        ...req.query
      })

      this.searcherFinancial.prepareSearch(searcher)
      const ret = await this.searcherFinancial.find({
        metadata: [{
          id: "metadata-totalizers",
          conditions: [
            {
              $match: searcher.filters
            },
            {
              $group: {
                _id: "$type",
                total: { $sum: '$value' },
              }
            }
          ]
        }]
      })
      return ret
    } catch (error) {
      console.log(error)
      this.processError(error)
    }
  }
}
export default new ReadFlow
