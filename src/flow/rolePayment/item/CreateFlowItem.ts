import { RolePaymentRepository } from "../../../model/schema/RolePayment"

class CreateFlowItem {
  async create(rolePayment: {}, session = undefined) {
    return await RolePaymentRepository.create([rolePayment], { session })
  }
}

export default new CreateFlowItem
