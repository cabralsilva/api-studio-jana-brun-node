import { StateRepository, StateSearch } from "../../../model/schema/address/State"

class FindByFilterFlowItem {
  async find(search: StateSearch) {
    
    if (search.isPageable()) {
      return await search.findPageable(StateRepository)
    }

    return await search.findNoPageable(StateRepository)
  }
}

export default new FindByFilterFlowItem
