import { PaymentConditionRepository } from "../../../../model/schema/IPaymentCondition"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await PaymentConditionRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
