import { PersonRepository } from "../../../model/schema/Person"

class GetByIdFlowItem {
  async get(id: string, pop = "", sel = "") {
    return await PersonRepository.findById(id).populate(pop).select(sel)
  }
}

export default new GetByIdFlowItem
