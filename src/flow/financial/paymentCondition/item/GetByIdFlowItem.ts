import { PaymentConditionRepository } from "../../../../model/schema/PaymentCondition"

class GetByIdFlowItem {
  async get(id: string, pop = "", sel = ""): Promise<any> {
    return await PaymentConditionRepository.findById(id).populate(pop).select(sel)
  }
}

export default new GetByIdFlowItem
