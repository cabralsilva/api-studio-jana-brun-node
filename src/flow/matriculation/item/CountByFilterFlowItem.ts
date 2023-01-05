import { MatriculationRepository } from "../../../model/schema/Matriculation"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await MatriculationRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
