import { StateRepository, StateSearch } from "../../../model/schema/address/State"

class FindByFilterFlowItem {
  async find(search: StateSearch) {
    const filters = search.filters()
    if (search.isPageable()) {
      return await search.findPageable(StateRepository, filters)
    }

    return await search.findNoPageable(StateRepository, filters)
  }
}

export default new FindByFilterFlowItem
