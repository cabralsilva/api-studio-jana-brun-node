import { GrateItemRepository } from "../../../model/schema/GrateItem"

class GetByIdFlowItem {
  async get(id: string, pop = "", sel = "") {
    return await GrateItemRepository.findById(id).populate(pop).select(sel)
  }
}

export default new GetByIdFlowItem
