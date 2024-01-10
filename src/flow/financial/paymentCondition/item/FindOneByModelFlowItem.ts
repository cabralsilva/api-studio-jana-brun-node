import { PaymentConditionRepository } from "../../../../model/schema/IPaymentCondition"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined) {
    return await PaymentConditionRepository.findOne(model)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem
