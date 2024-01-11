import { MatriculationRepository, MatriculationSearchOLD } from "../../../model/schema/IMatriculation"

class CountMatriculationBySearchFlowItem {
  async find(search: MatriculationSearchOLD): Promise<number> {
    return await search.count(MatriculationRepository)
  }
}

export default new CountMatriculationBySearchFlowItem
