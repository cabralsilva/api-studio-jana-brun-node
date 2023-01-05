import { MatriculationRepository } from "../../../model/schema/Matriculation"

class GetByIdFlowItem {
  async get(id: string, pop = undefined, sel = "") {
    return await MatriculationRepository.findById(id).populate(pop).select(sel)
  }
}

export default new GetByIdFlowItem
