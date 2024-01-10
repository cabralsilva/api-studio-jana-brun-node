import { FinancialRepository } from "../../../../model/schema/Financial"

class CreateFinancialFlowItem {
  async create(financial: {}, session = undefined) {
    return await FinancialRepository.create([financial], { session })
  }
}

export default new CreateFinancialFlowItem
