import { MatriculationRepository, MatriculationSearch } from "../../../model/schema/Matriculation"

class CountMatriculationBySearchFlowItem {
  async find(search: MatriculationSearch): Promise<number> {
    return await search.count(MatriculationRepository)
  }
}

export default new CountMatriculationBySearchFlowItem
