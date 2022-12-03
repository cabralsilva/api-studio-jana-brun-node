import { RolePaymentRepository } from "../../../model/schema/RolePayment"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined) {
    return await RolePaymentRepository.findOne(model)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem
