import { FinancialRepository } from "../../../../model/schema/Financial"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await FinancialRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
