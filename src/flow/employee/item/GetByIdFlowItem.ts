import { EmployeeRepository } from "../../../model/schema/Employee"

class GetByIdFlowItem {
  async get(id: string, pop = "", sel = "") {
    return await EmployeeRepository.findById(id).populate(pop).select(sel)
  }
}

export default new GetByIdFlowItem
