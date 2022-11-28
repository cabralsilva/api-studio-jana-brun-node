import { CityRepository, CitySearch } from "../../../model/schema/address/City"

class FindByFilterFlowItem {
  async find(search: CitySearch) {
    const filters = search.filters()
    if (search.isPageable()) {
      return await search.findPageable(CityRepository, filters)
    }

    return await search.findNoPageable(CityRepository, filters)
  }
}

export default new FindByFilterFlowItem
