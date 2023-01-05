import { PaymentConditionRepository } from "../../../../model/schema/PaymentCondition"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined) {
    return await PaymentConditionRepository.findOne(model)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem
