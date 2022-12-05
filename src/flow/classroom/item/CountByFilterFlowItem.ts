import { ClassroomRepository } from "../../../model/schema/Classroom"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await ClassroomRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
