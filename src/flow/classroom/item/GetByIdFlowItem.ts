import { ClassroomRepository } from "../../../model/schema/Classroom"

class GetByIdFlowItem {
  async get(id: string, pop = "", sel = "") {
    return await ClassroomRepository.findById(id).populate(pop).select(sel)
  }
}

export default new GetByIdFlowItem
