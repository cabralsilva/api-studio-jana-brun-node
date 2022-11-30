import { PaymentConditionRepository } from "../../../../model/schema/PaymentCondition"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await PaymentConditionRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
