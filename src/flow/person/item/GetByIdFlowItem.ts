import { PersonRepository } from "../../../model/schema/IPerson"

class GetByIdFlowItem {
  async get(id: string, pop = "", sel = "") {
    return await PersonRepository.findById(id).populate(pop).select(sel)
  }
}

export default new GetByIdFlowItem
