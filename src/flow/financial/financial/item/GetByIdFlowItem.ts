import { FinancialRepository } from "../../../../model/schema/IFinancial"

class GetByIdFlowItem {
  async get(id: string, pop = "", sel = "") {
    return await FinancialRepository.findById(id).populate(pop).select(sel)
  }
}

export default new GetByIdFlowItem
