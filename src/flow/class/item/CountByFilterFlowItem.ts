import { ClassRepository } from "../../../model/schema/Class"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await ClassRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
