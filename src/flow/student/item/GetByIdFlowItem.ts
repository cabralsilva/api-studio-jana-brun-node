import { StudentRepository } from "../../../model/schema/IStudent"

class GetByIdFlowItem {
  async get(id: string, pop = undefined, sel = "") {
    return await StudentRepository.findById(id)
      .populate(pop)
      .select(sel)
  }
}

export default new GetByIdFlowItem
