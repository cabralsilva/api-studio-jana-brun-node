import { PaymentConditionRepository } from "../../../../model/schema/IPaymentCondition"

class CreateFlowItem {
  async create(paymentCondition: {}, session = undefined) {
    return await PaymentConditionRepository.create([paymentCondition], { session })
  }
}

export default new CreateFlowItem
