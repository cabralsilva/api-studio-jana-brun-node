import { ClassRepository, ClassSearch } from "../../../model/schema/Class"

class FindClassByFilterFlowItem {
  async find(search: ClassSearch) {
    
    if (search.isPageable()) {
      return await search.findPageable(ClassRepository)
    }

    return await search.findNoPageable(ClassRepository)
  }
}

export default new FindClassByFilterFlowItem
