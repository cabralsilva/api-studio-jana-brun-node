import { PayrollRepository } from "../../../model/schema/IPayroll"

class GetByIdFlowItem {
  async get(id: string, pop = undefined, sel = "") {
    return await PayrollRepository.findById(id)
      .populate(pop)
      .select(sel)
  }
}

export default new GetByIdFlowItem