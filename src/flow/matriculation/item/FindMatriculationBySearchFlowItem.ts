import { MatriculationRepository, MatriculationSearchOLD } from "../../../model/schema/IMatriculation"

class FindMatriculationBySearchFlowItem {
  async find(search: MatriculationSearchOLD) {
    
    if (search.isPageable()) {
      return await search.findPageable(MatriculationRepository)
    }

    return await search.findNoPageable(MatriculationRepository)
  }
}

export default new FindMatriculationBySearchFlowItem
