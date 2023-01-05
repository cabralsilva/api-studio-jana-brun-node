import { MatriculationRepository } from "../../../model/schema/Matriculation"

class CreateFlowItem {
  async create(matriculation: {}, session = undefined) {
    return await MatriculationRepository.create([matriculation], { session })
  }
}

export default new CreateFlowItem
