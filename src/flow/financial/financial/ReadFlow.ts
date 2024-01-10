import * as HttpStatus from 'http-status'
import FlowHttp from '../../../model/FlowHttp'
import HttpError from '../../../model/HttpError'
import { FinancialRepository, FinancialSearch, FinancialSearchOLD } from '../../../model/schema/Financial'
import { getMessage } from "../../../config/i18n"
import Utils from '../../../utils/Utils'
import EnrichFindFlowItem from './item/EnrichFindFlowItem'
import FindBySearchFlowItem from "./item/FindBySearchFlowItem"
import GetByIdFlowItem from "./item/GetByIdFlowItem"
import PrepareSearchPersonFlowItem from "./item/PrepareSearchPersonFlowItem"
import { Request, Response } from 'express'
import { CrudFlow } from 'c2-mongoose'

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

      const searcher = new FinancialSearch({
        ...req.query
      })
      // await PrepareSearchPersonFlowItem.prepare(req)
      // var resultSearch = await FindBySearchFlowItem.find(new FinancialSearchOLD(req.query)) as any
      // return EnrichFindFlowItem.enrich(resultSearch)
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
