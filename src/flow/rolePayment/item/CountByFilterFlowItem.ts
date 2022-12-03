import { RolePaymentRepository } from "../../../model/schema/RolePayment"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await RolePaymentRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
