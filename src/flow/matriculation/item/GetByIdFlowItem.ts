import { MatriculationRepository } from "../../../model/schema/IMatriculation"

class GetByIdFlowItem {
  async get(id: string, pop = undefined, sel = ""): Promise<any> {
    return await MatriculationRepository.findById(id).populate(pop).select(sel)
  }
}

export default new GetByIdFlowItem
