import { FinancialRepository } from "../../../../model/schema/IFinancial"

class CreateFinancialFlowItem {
  async create(financial: {}, session = undefined) {
    return await FinancialRepository.create([financial], { session })
  }
}

export default new CreateFinancialFlowItem
