import { GrateRepository, GrateSearch } from "../../../model/schema/Grate"

class FindByFilterFlowItem {
  async find(search: GrateSearch): Promise<any> {

    if (search.isPageable()) {
      return await search.findPageable(GrateRepository)
    }

    return await search.findNoPageable(GrateRepository)
  }
}

export default new FindByFilterFlowItem
