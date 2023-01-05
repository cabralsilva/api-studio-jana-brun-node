import { GrateItemRepository } from "../../../model/schema/GrateItem"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await GrateItemRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
