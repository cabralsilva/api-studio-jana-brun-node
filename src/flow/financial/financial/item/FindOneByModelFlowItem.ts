import { FinancialRepository } from "../../../../model/schema/IFinancial"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined) {
    return await FinancialRepository.findOne(model)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem
