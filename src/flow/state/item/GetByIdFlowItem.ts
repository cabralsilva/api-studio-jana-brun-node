import { StateRepository } from "../../../model/schema/address/State"

class GetByIdFlowItem {
  async get(id: string, pop = "", sel = "") {
    return await StateRepository.findById(id).populate(pop).select(sel)
  }
}

export default new GetByIdFlowItem
