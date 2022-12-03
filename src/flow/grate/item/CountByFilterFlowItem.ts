import { GrateRepository } from "../../../model/schema/Grate"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await GrateRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
