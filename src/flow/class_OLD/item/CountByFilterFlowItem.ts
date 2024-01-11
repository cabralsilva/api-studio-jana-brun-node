import { ClassRepository } from "../../../model/schema/IClass"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await ClassRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
