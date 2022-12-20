import { FinancialRepository } from "../../../../model/schema/Financial"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined) {
    return await FinancialRepository.findOne(model)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem
