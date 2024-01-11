import { ClassRepository } from "../../../model/schema/IClass"

class GetByIdFlowItem {
  async get(id: string, pop = undefined, sel = "") {
    return await ClassRepository.findById(id).populate(pop).select(sel)
  }
}

export default new GetByIdFlowItem