import { MatriculationRepository, MatriculationSearch } from "../../../model/schema/Matriculation"

class FindByFilterFlowItem {
  async find(search: MatriculationSearch) {
    
    if (search.isPageable()) {
      return await search.findPageable(MatriculationRepository)
    }

    return await search.findNoPageable(MatriculationRepository)
  }
}

export default new FindByFilterFlowItem
