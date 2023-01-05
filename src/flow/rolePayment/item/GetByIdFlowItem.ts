import { RolePaymentRepository } from "../../../model/schema/RolePayment"

class GetByIdFlowItem {
  async get(id: string, pop = "", sel = "") {
    return await RolePaymentRepository.findById(id).populate(pop).select(sel)
  }
}

export default new GetByIdFlowItem
