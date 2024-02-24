import { GrateRepository } from "../../../model/schema/IGrate"

class GetByIdFlowItem {
  async get(id: string, pop = "", sel = "") {
    return await GrateRepository.findById(id).populate(pop).select(sel)
  }
}

export default new GetByIdFlowItem
