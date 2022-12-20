import { FinancialRepository, FinancialSearch } from "../../../../model/schema/Financial"

class FindByFilterFlowItem {
  async find(search: FinancialSearch) {
    
    if (search.isPageable()) {
      return await search.findPageable(FinancialRepository)
    }

    return await search.findNoPageable(FinancialRepository)
  }
}

export default new FindByFilterFlowItem
