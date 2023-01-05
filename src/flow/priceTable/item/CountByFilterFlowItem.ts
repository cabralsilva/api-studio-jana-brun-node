import { PriceTableRepository } from "../../../model/schema/PriceTable"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await PriceTableRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
