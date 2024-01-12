import { FinancialRepository } from "../../../../model/schema/IFinancial"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await FinancialRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
