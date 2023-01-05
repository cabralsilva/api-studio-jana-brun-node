import { RolePaymentRepository } from "../../../model/schema/RolePayment"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await RolePaymentRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
