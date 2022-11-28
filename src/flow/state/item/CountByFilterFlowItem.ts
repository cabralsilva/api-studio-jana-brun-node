import { StateRepository } from "../../../model/schema/address/State"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await StateRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
