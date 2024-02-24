import { GrateRepository } from "../../../model/schema/IGrate"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await GrateRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
