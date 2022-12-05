import { ClassroomRepository } from "../../../model/schema/Classroom"

class CreateFlowItem {
  async create(classroom: {}, session = undefined) {
    return await ClassroomRepository.create([classroom], { session })
  }
}

export default new CreateFlowItem
