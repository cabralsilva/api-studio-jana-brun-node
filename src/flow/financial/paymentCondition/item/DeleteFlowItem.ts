import { PaymentConditionRepository } from "../../../../model/schema/IPaymentCondition"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await PaymentConditionRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
