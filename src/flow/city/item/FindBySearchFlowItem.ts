import { CityRepository, CitySearch } from "../../../model/schema/address/City"

class FindByFilterFlowItem {
  async find(search: CitySearch) {
    
    if (search.isPageable()) {
      return await search.findPageable(CityRepository)
    }

    return await search.findNoPageable(CityRepository)
  }
}

export default new FindByFilterFlowItem
