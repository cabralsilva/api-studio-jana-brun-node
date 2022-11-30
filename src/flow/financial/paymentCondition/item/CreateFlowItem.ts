import { PaymentConditionRepository } from "../../../../model/schema/PaymentCondition"

class CreateFlowItem {
  async create(paymentCondition: {}, session = undefined) {
    return await PaymentConditionRepository.create([paymentCondition], { session })
  }
}

export default new CreateFlowItem
