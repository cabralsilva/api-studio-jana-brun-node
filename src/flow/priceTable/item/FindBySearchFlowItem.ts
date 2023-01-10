import { PriceTableRepository, PriceTableSearch } from "../../../model/schema/PriceTable"

class FindByFilterFlowItem {
  async find(search: PriceTableSearch): Promise<any> {

    if (search.isPageable()) {
      return await search.findPageable(PriceTableRepository)
    }

    return await search.findNoPageable(PriceTableRepository)
  }
}

export default new FindByFilterFlowItem
