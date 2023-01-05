import { FinancialRepository } from "../../../../model/schema/Financial"

class CreateFlowItem {
  async create(financial: {}, session = undefined) {
    return await FinancialRepository.create([financial], { session })
  }
}

export default new CreateFlowItem
