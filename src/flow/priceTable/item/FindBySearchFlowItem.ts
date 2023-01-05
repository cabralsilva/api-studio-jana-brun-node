import { PriceTableRepository, PriceTableSearch } from "../../../model/schema/PriceTable"

class FindByFilterFlowItem {
  async find(search: PriceTableSearch) {
    
    if (search.isPageable()) {
      return await search.findPageable(PriceTableRepository)
    }

    return await search.findNoPageable(PriceTableRepository)
  }
}

export default new FindByFilterFlowItem
