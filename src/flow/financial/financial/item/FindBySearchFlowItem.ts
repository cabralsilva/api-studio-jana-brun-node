import mongoose from "mongoose";
import { FinancialRepository, FinancialSearchOLD } from "../../../../model/schema/Financial";

class FindByFilterFlowItem {
  async find(search: FinancialSearchOLD) {

    var response = {} as any
    
    if (search.isPageable()) {
      response = await search.findPageable(FinancialRepository)
    } else {
      response = await search.findNoPageable(FinancialRepository)
    }
    
    response = {
      ...response,
      metadata: {
        totalizers: await search.sumBy(FinancialRepository, "$value", "$type")
      }
    }

    return response
  }
}

export default new FindByFilterFlowItem
